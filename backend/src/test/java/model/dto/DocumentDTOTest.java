package model.dto;

import ch.supsi.model.dto.DocumentDTO;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
public class DocumentDTOTest {
    @Test
    @DisplayName("Should create DocumentDTO with empty constructor")
    void test01CreateDocumentDTO_EmptyConstructor() {
        DocumentDTO docDTO = new DocumentDTO();

        assertNull(docDTO.getId());
        assertNull(docDTO.getTitle());
        assertNull(docDTO.getOwnerWallet());
        assertNull(docDTO.getUploadTimestamp());
        assertNull(docDTO.getHash());
    }

    @Test
    @DisplayName("Should create DocumentDTO passing parameters to constructor")
    void test02CreateDocumentDTO_PassingParametersConstructor() {
        Long id = 1L;
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        byte[] content = "content".getBytes();
        String hash = "hash";

        DocumentDTO docDTO = new DocumentDTO(id, title, ownerWallet, uploadTimestamp, hash);

        assertEquals(id, docDTO.getId());
        assertEquals(title, docDTO.getTitle());
        assertEquals(ownerWallet, docDTO.getOwnerWallet());
        assertEquals(uploadTimestamp, docDTO.getUploadTimestamp());
        assertEquals(hash, docDTO.getHash());
    }

    @Test
    @DisplayName("Should all setters works correctly")
    void test03SetAllSetters_Correctly() {
        Long id = 1L;
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        byte[] content = "content".getBytes();
        String hash = "hash";

        DocumentDTO docDTO = new DocumentDTO();
        docDTO.setId(id);
        docDTO.setTitle(title);
        docDTO.setOwnerWallet(ownerWallet);
        docDTO.setUploadTimestamp(uploadTimestamp);
        docDTO.setHash(hash);

        assertEquals(id, docDTO.getId());
        assertEquals(title, docDTO.getTitle());
        assertEquals(ownerWallet, docDTO.getOwnerWallet());
        assertEquals(uploadTimestamp, docDTO.getUploadTimestamp());
        assertEquals(hash, docDTO.getHash());
    }
}
