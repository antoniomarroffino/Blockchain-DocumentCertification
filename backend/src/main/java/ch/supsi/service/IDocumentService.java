package ch.supsi.service;

import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;

import java.io.IOException;
import java.util.List;

public interface IDocumentService {
    DocumentDTO createDocument(UploadFormDTO documentDTO) throws IOException;
    byte[] getContentBytesByDocumentId(Long id);
    List<DocumentDTO> getAllDocuments();
    List<DocumentDTO> getDocumentsByOwner(String ownerWallet);
}
