package repository;

import ch.supsi.model.api.Document;
import ch.supsi.repository.DocumentRepository;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.*;
import testContainersResource.MySqlTestResource;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
@QuarkusTestResource(MySqlTestResource.class)
public class DocumentRepositoryTest {
    @Inject
    DocumentRepository documentRepository;

    @BeforeEach
    @AfterEach
    @Transactional
    public void cleanup() {
        this.documentRepository.deleteAll();
    }

    @Test
    @DisplayName("Should return list of documents by ownerWallet when exists")
    @Transactional
    void test01FindByOwnerFound() {
        Document doc = new Document();
        doc.setTitle("TestDoc");
        doc.setOwnerWallet("owner1");
        doc.setUploadTimestamp(Instant.now());
        byte[] content = new byte[]{1, 2, 3};
        doc.setContent(content);
        doc.setHash("hash1");

        this.documentRepository.persist(doc);

        List<Document> result = this.documentRepository.findByOwner("owner1");

        assertEquals(1, result.size(), "Expected one document for owner1");
        Document found = result.getFirst();
        assertEquals("TestDoc", found.getTitle());
        assertEquals("owner1", found.getOwnerWallet());
        assertArrayEquals(content, found.getContent());
        assertEquals("hash1", found.getHash());
    }

    @Test
    @DisplayName("Should return empty list when no documents for owner")
    void test02FindByOwnerNotFound() {
        List<Document> result = this.documentRepository.findByOwner("nonexistent");
        assertTrue(result.isEmpty(), "Expected no documents for a nonexistent owner");
    }

    @Test
    @DisplayName("Should return multiple documents for same owner")
    @Transactional
    void test03FindByOwnerMultiple() {
        Document doc1 = new Document();
        doc1.setTitle("Doc1");
        doc1.setOwnerWallet("ownerX");
        doc1.setUploadTimestamp(Instant.now());
        doc1.setContent(new byte[]{0});
        doc1.setHash("h1");
        this.documentRepository.persist(doc1);

        Document doc2 = new Document();
        doc2.setTitle("Doc2");
        doc2.setOwnerWallet("ownerX");
        doc2.setUploadTimestamp(Instant.now());
        doc2.setContent(new byte[]{1});
        doc2.setHash("h2");
        this.documentRepository.persist(doc2);

        List<Document> result = this.documentRepository.findByOwner("ownerX");
        assertEquals(2, result.size(), "Expected two documents for ownerX");
    }

    @Test
    @DisplayName("Should return only documents for the specified owner")
    @Transactional
    void test04FindByOwnerFiltersCorrectly() {
        Document docA = new Document();
        docA.setTitle("A");
        docA.setOwnerWallet("ownerA");
        docA.setUploadTimestamp(Instant.now());
        docA.setContent(new byte[]{9});
        docA.setHash("ha");
        this.documentRepository.persist(docA);

        Document docB = new Document();
        docB.setTitle("B");
        docB.setOwnerWallet("ownerB");
        docB.setUploadTimestamp(Instant.now());
        docB.setContent(new byte[]{8});
        docB.setHash("hb");
        this.documentRepository.persist(docB);

        List<Document> resultA = this.documentRepository.findByOwner("ownerA");
        assertEquals(1, resultA.size(), "Expected one document for ownerA");
        assertEquals("ownerA", resultA.getFirst().getOwnerWallet());
    }
}
