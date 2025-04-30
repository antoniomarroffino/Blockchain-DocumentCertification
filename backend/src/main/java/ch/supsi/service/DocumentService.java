package ch.supsi.service;

import ch.supsi.mapper.DocumentMapper;
import ch.supsi.model.api.Document;
import ch.supsi.model.api.MimeTypeWithContent;
import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;
import ch.supsi.repository.DocumentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

        documentRepository.persist(document);
        return documentMapper.toDTO(document);
    }

    @Override
    public byte[] getContentBytesByDocumentId(Long id) {
        return Optional.ofNullable(documentRepository.findById(id))
                .map(Document::getContent)
                .orElse(null);
    }

    @Override
    public List<DocumentDTO> getAllDocuments() {
        return Optional.ofNullable(documentRepository.listAll())
                .orElse(Collections.emptyList())
                .stream()
                .map(documentMapper::toDTO)
                .toList();
    }

    @Override
    public List<DocumentDTO> getDocumentsByOwner(String ownerWallet) {
        return Optional.ofNullable(documentRepository.findByOwner(ownerWallet))
                .orElse(Collections.emptyList())
                .stream()
                .map(documentMapper::toDTO)
                .toList();
    }

    @Override
    public MimeTypeWithContent getDocumentContentWithType(Long id) {
        return Optional.ofNullable(documentRepository.findById(id))
                .filter(doc -> doc.getContent() != null)
                .map(doc -> new MimeTypeWithContent(detectMimeType(doc.getContent()), doc.getContent()))
                .orElse(null);
    }

    private String detectMimeType(byte[] data) {
        try {
            return Optional.ofNullable(
                    URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(data))
            ).orElse("application/octet-stream");
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }
}
