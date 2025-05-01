package service;

import ch.supsi.mapper.DocumentMapper;
import ch.supsi.model.api.Document;
import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;
import ch.supsi.repository.DocumentRepository;
import ch.supsi.service.DocumentService;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@QuarkusTest
class DocumentServiceTest {

    @Inject
    DocumentService documentService;

    @InjectMock
    DocumentRepository documentRepository;

    @InjectMock
    DocumentMapper documentMapper;

    private Document createTestDocument(Long id, byte[] content) {
        Document doc = new Document();
        doc.setId(id);
        doc.setTitle("Title" + id);
        doc.setOwnerWallet("owner" + id);
        doc.setUploadTimestamp(Instant.now());
        doc.setContent(content);
        doc.setHash("hash" + id);
        return doc;
    }

    private DocumentDTO createTestDTO(Long id) {
        DocumentDTO dto = new DocumentDTO();
        dto.setId(id);
        dto.setTitle("Title" + id);
        dto.setOwnerWallet("owner" + id);
        dto.setUploadTimestamp(Instant.now());
        dto.setHash("hash" + id);
        return dto;
    }

    @Nested
    @DisplayName("Document Creation Tests")
    class DocumentCreationTests {
        @Test
        @DisplayName("Should successfully create document")
        void createDocumentSuccess() throws IOException {
            byte[] content = new byte[]{10, 20, 30};
            UploadFormDTO form = mock(UploadFormDTO.class);
            when(form.getTitle()).thenReturn("Title1");
            when(form.getOwnerWallet()).thenReturn("owner1");
            when(form.getFile()).thenReturn(new ByteArrayInputStream(content));
            when(form.getHash()).thenReturn("hash1");

            doAnswer(invocation -> {
                Document arg = invocation.getArgument(0);
                arg.setId(1L);
                return null;
            }).when(documentRepository).persist(any(Document.class));

            DocumentDTO expectedDTO = createTestDTO(1L);
            when(documentMapper.toDTO(any(Document.class))).thenReturn(expectedDTO);
            DocumentDTO result = documentService.createDocument(form);
            assertNotNull(result);
            assertEquals(expectedDTO, result);
            verify(documentRepository).persist(any(Document.class));
            verify(documentMapper).toDTO(any(Document.class));
        }

        @Test
        @DisplayName("Should handle IO Exception during creation")
        void createDocumentIOException() throws IOException {
            UploadFormDTO form = mock(UploadFormDTO.class);
            when(form.getFile()).thenReturn(mock(ByteArrayInputStream.class));
            when(form.getFile().readAllBytes()).thenThrow(new IOException("fail"));
            assertThrows(IOException.class, () -> documentService.createDocument(form));
            verify(documentRepository, never()).persist((Document) any());
            verify(documentMapper, never()).toDTO(any());
        }
    }

    @Nested
    @DisplayName("Document Content Tests")
    class DocumentContentTests {
        @Test
        @DisplayName("Should return content bytes when document exists")
        void getContentBytesByDocumentIdSuccess() {
            byte[] expectedContent = new byte[]{5, 6, 7};
            Document doc = createTestDocument(2L, expectedContent);
            when(documentRepository.findById(2L)).thenReturn(doc);
            byte[] result = documentService.getContentBytesByDocumentId(2L);
            assertNotNull(result);
            assertArrayEquals(expectedContent, result);
            verify(documentRepository).findById(2L);
        }

        @Test
        @DisplayName("Should return null when document not found")
        void getContentBytesByDocumentIdNotFound() {
            when(documentRepository.findById(99L)).thenReturn(null);
            byte[] result = documentService.getContentBytesByDocumentId(99L);
            assertNull(result);
            verify(documentRepository).findById(99L);
        }

        @Test
        @DisplayName("Should return null when document has no content")
        void getContentBytesByDocumentIdNoContent() {
            Document doc = createTestDocument(3L, null);
            when(documentRepository.findById(3L)).thenReturn(doc);
            byte[] result = documentService.getContentBytesByDocumentId(3L);
            assertNull(result);
            verify(documentRepository).findById(3L);
        }


        @Nested
        @DisplayName("Document Listing Tests")
        class DocumentListingTests {
            @Test
            @DisplayName("Should return all documents")
            void getAllDocumentsSuccess() {
                Document doc = createTestDocument(3L, new byte[]{8});
                DocumentDTO dto = createTestDTO(3L);
                when(documentRepository.listAll()).thenReturn(List.of(doc));
                when(documentMapper.toDTO(doc)).thenReturn(dto);
                List<DocumentDTO> result = documentService.getAllDocuments();
                assertEquals(1, result.size());
                assertEquals(dto, result.getFirst());
                verify(documentRepository).listAll();
                verify(documentMapper).toDTO(doc);
            }

            @Test
            @DisplayName("Should return empty list when no documents exist")
            void getAllDocumentsEmpty() {
                when(documentRepository.listAll()).thenReturn(Collections.emptyList());
                List<DocumentDTO> result = documentService.getAllDocuments();
                assertTrue(result.isEmpty());
                verify(documentRepository).listAll();
                verify(documentMapper, never()).toDTO(any());
            }

            @Test
            @DisplayName("Should return documents by owner")
            void getDocumentsByOwnerSuccess() {
                Document doc = createTestDocument(4L, new byte[]{9});
                DocumentDTO dto = createTestDTO(4L);
                when(documentRepository.findByOwner("ownerY")).thenReturn(List.of(doc));
                when(documentMapper.toDTO(doc)).thenReturn(dto);
                List<DocumentDTO> result = documentService.getDocumentsByOwner("ownerY");
                assertEquals(1, result.size());
                assertEquals(dto, result.getFirst());
                verify(documentRepository).findByOwner("ownerY");
                verify(documentMapper).toDTO(doc);
            }
        }
    }
}
