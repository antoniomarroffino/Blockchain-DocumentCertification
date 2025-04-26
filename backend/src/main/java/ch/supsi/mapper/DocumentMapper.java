package ch.supsi.mapper;

import ch.supsi.model.api.Document;
import ch.supsi.model.dto.DocumentDTO;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DocumentMapper implements IBaseMapper<Document, DocumentDTO> {
    @Override
    public DocumentDTO toDTO(Document entity) {
        if(entity == null) return null;

        DocumentDTO dto = new DocumentDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setOwnerWallet(entity.getOwnerWallet());
        dto.setUploadTimestamp(entity.getUploadTimestamp());
        dto.setHash(entity.getHash());

        return dto;
    }

    @Override
    public Document toEntity(DocumentDTO dto) {
        if(dto == null) return null;

        Document document = new Document();
        if(dto.getId() != null)
            document.setId(dto.getId());
        document.setTitle(dto.getTitle());
        document.setOwnerWallet(dto.getOwnerWallet());
        document.setUploadTimestamp(dto.getUploadTimestamp());
        document.setHash(dto.getHash());

        return document;
    }
}
