package ch.supsi.service;

import ch.supsi.model.document.Document;
import ch.supsi.model.dto.DocumentDTO;

import java.io.IOException;
import java.util.List;

public interface IDocumentService {
    Document createDocument(DocumentDTO documentDTO);
    List<Document> getAllDocuments();
    List<Document> getDocumentsByOwner(String ownerWallet);
}
