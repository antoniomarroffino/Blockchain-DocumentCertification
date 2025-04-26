package model.api;

import ch.supsi.model.api.Document;
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
public class DocumentTest {
    @Test
    @DisplayName("Should create Document with empty constructor")
    void test01CreateDocument_EmptyConstructor() {
        Document doc = new Document();

        assertNull(doc.getId());
        assertNull(doc.getTitle());
        assertNull(doc.getOwnerWallet());
        assertNull(doc.getUploadTimestamp());
        assertNull(doc.getContent());
        assertNull(doc.getHash());
    }

    @Test
    @DisplayName("Should create Document passing parameters to constructor")
    void test02CreateDocument_PassingParametersConstructor() {
        Long id = 1L;
        String title = "title";
        String ownerWallet = "ownerWallet";
        Instant uploadTimestamp = Instant.now();
        byte[] content = "content".getBytes();
        String hash = "hash";

        Document doc = new Document(id, title, ownerWallet, uploadTimestamp, content, hash);

        assertEquals(id, doc.getId());
        assertEquals(title, doc.getTitle());
        assertEquals(ownerWallet, doc.getOwnerWallet());
        assertEquals(uploadTimestamp, doc.getUploadTimestamp());
        assertEquals(content, doc.getContent());
        assertEquals(hash, doc.getHash());
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

        Document doc = new Document();
        doc.setId(id);
        doc.setTitle(title);
        doc.setOwnerWallet(ownerWallet);
        doc.setUploadTimestamp(uploadTimestamp);
        doc.setContent(content);
        doc.setHash(hash);

        assertEquals(id, doc.getId());
        assertEquals(title, doc.getTitle());
        assertEquals(ownerWallet, doc.getOwnerWallet());
        assertEquals(uploadTimestamp, doc.getUploadTimestamp());
        assertEquals(content, doc.getContent());
        assertEquals(hash, doc.getHash());
    }
}
