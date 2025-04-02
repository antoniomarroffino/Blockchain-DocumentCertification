package ch.supsi.service;

import ch.supsi.model.document.Document;
import ch.supsi.model.dto.DocumentDTO;
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

    @Override
    @Transactional
    public Document createDocument(DocumentDTO documentDTO) {
        Document document = new Document();
        document.setTitle(documentDTO.getTitle());
        document.setOwnerWallet(documentDTO.getOwnerWallet());
        document.setUploadTimestamp(Instant.now());
        this.documentRepository.persist(document);
        return document;
    }

    @Override
    public List<Document> getAllDocuments() {
        return this.documentRepository.listAll();
    }

    @Override
    public List<Document> getDocumentsByOwner(String ownerWallet) {
        return this.documentRepository.findByOwner(ownerWallet);
    }
}
