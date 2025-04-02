package ch.supsi.service;

import ch.supsi.model.document.Document;

import java.util.List;

public interface IDocumentService {
    Document createDocument(Document document);
    List<Document> getAllDocuments();
    List<Document> getDocumentsByOwner(String ownerWallet);
}
