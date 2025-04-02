package ch.supsi.service;

import ch.supsi.model.document.Document;
import ch.supsi.repository.DocumentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class DocumentService implements IDocumentService {
    @Inject
    DocumentRepository documentRepository;


    @Override
    public Document createDocument(Document document) {
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
