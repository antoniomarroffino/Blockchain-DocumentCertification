package mapper;

import ch.supsi.mapper.DocumentMapper;
import ch.supsi.model.api.Document;
import ch.supsi.model.dto.DocumentDTO;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
public class DocumentMapperTest {
    @Inject
    DocumentMapper documentMapper;

    @Test
    @DisplayName("Should return null when passing entity null")
    void test01ToDTO_ReturnNullValue() {
        DocumentDTO dto = this.documentMapper.toDTO(null);
        assertNull(dto);
    }

    @Test
    @DisplayName("Should return dto from valid entity")
    void test02ToDTO_ValidEntity() {
        Long id = 1L;
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        byte[] content = "content".getBytes();
        String hash = "hash";

        Document document = new Document(id, title, ownerWallet, uploadTimestamp, content, hash);
        DocumentDTO dto = this.documentMapper.toDTO(document);

        assertEquals(id, dto.getId());
        assertEquals(title, dto.getTitle());
        assertEquals(ownerWallet, dto.getOwnerWallet());
        assertEquals(uploadTimestamp, dto.getUploadTimestamp());
        assertEquals(hash, dto.getHash());
    }

    @Test
    @DisplayName("Should return null when passing dto null")
    void test03ToEntity_ReturnNullValue() {
        Document document = this.documentMapper.toEntity(null);
        assertNull(document);
    }

    @Test
    @DisplayName("Should return entity from valid dto")
    void test04ToEntity_ValidDTO() {
        Long id = 1L;
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        String hash = "hash";

        DocumentDTO documentDTO = new DocumentDTO(id, title, ownerWallet, uploadTimestamp, hash);
        Document document = this.documentMapper.toEntity(documentDTO);

        assertEquals(id, document.getId());
        assertEquals(title, document.getTitle());
        assertEquals(ownerWallet, document.getOwnerWallet());
        assertEquals(uploadTimestamp, document.getUploadTimestamp());
        assertEquals(hash, document.getHash());
    }

    @Test
    @DisplayName("Should return entity from valid dto with id null")
    void test05ToEntity_ValidDTOWithIdNull() {
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        String hash = "hash";

        DocumentDTO documentDTO = new DocumentDTO(null, title, ownerWallet, uploadTimestamp, hash);
        Document document = this.documentMapper.toEntity(documentDTO);

        assertNull(document.getId());
        assertEquals(title, document.getTitle());
        assertEquals(ownerWallet, document.getOwnerWallet());
        assertEquals(uploadTimestamp, document.getUploadTimestamp());
        assertEquals(hash, document.getHash());
    }
}
