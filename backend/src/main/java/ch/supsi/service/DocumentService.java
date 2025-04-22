package ch.supsi.service;

import ch.supsi.mapper.DocumentMapper;
import ch.supsi.model.document.Document;
import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;
import ch.supsi.repository.DocumentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class DocumentService implements IDocumentService {
    @Inject
    DocumentRepository documentRepository;

    @Inject
    DocumentMapper documentMapper;

    @Override
    @Transactional
    public DocumentDTO createDocument(UploadFormDTO uploadFormDTO) throws IOException {
        Document document = new Document();
        document.setTitle(uploadFormDTO.getTitle());
        document.setOwnerWallet(uploadFormDTO.getOwnerWallet());
        document.setUploadTimestamp(Instant.now());
        document.setContent(uploadFormDTO.getFile().readAllBytes());
        document.setHash(uploadFormDTO.getHash());
        this.documentRepository.persist(document);
        return this.documentMapper.toDTO(document);
    }

    @Override
    public byte[] getContentBytesByDocumentId(Long id) {
        Document document = this.documentRepository.findById(id);
        if(document == null)
            return null;
        return document.getContent();
    }

    @Override
    public List<DocumentDTO> getAllDocuments() {
        return this.documentRepository
                .listAll()
                .stream()
                .map(this.documentMapper::toDTO)
                .toList();
    }

    @Override
    public List<DocumentDTO> getDocumentsByOwner(String ownerWallet) {
        return this.documentRepository
                .findByOwner(ownerWallet)
                .stream()
                .map(this.documentMapper::toDTO)
                .toList();
    }
}
