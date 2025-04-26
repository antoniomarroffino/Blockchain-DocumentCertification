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
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
public class DocumentServiceTest {

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

    @Test
    @DisplayName("test01CreateDocument_ShouldPersistAndReturnDTO")
    void test01CreateDocument_ShouldPersistAndReturnDTO() throws IOException {
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
        }).when(this.documentRepository).persist(any(Document.class));


        DocumentDTO expectedDTO = createTestDTO(1L);
        when(this.documentMapper.toDTO(any(Document.class))).thenReturn(expectedDTO);

        DocumentDTO result = this.documentService.createDocument(form);

        assertNotNull(result);
        assertEquals(expectedDTO, result);

        verify(this.documentRepository, times(1)).persist(any(Document.class));
        verify(this.documentMapper, times(1)).toDTO(any(Document.class));
    }

    @Test
    @DisplayName("test02CreateDocument_ShouldPropagateIOException")
    void test02CreateDocument_ShouldPropagateIOException() throws IOException {
        UploadFormDTO form = mock(UploadFormDTO.class);

        when(form.getFile()).thenReturn(mock(ByteArrayInputStream.class));
        when(form.getFile().readAllBytes()).thenThrow(new IOException("fail"));

        IOException ex = assertThrows(
                IOException.class,
                () -> this.documentService.createDocument(form)
        );
        assertEquals("fail", ex.getMessage());

        verify(this.documentRepository, never()).persist(any(Document.class));
        verify(this.documentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("test03GetContentBytesByDocumentId_ShouldReturnNullWhenNotFound")
    void test03GetContentBytesByDocumentId_ShouldReturnNullWhenNotFound() {
        when(this.documentRepository.findById(99L)).thenReturn(null);

        byte[] result = this.documentService.getContentBytesByDocumentId(99L);

        assertNull(result);

        verify(this.documentRepository, times(1)).findById(99L);
    }

    @Test
    @DisplayName("test04GetContentBytesByDocumentId_ShouldReturnContent")
    void test04GetContentBytesByDocumentId_ShouldReturnContent() {
        byte[] content = new byte[]{5, 6, 7};
        Document doc = createTestDocument(2L, content);

        when(this.documentRepository.findById(2L)).thenReturn(doc);

        byte[] result = this.documentService.getContentBytesByDocumentId(2L);

        assertArrayEquals(content, result);

        verify(this.documentRepository, times(1)).findById(2L);
    }

    @Test
    @DisplayName("test05GetAllDocuments_ShouldReturnEmptyList")
    void test05GetAllDocuments_ShouldReturnEmptyList() {
        when(this.documentRepository.listAll()).thenReturn(Collections.emptyList());

        List<DocumentDTO> result = this.documentService.getAllDocuments();

        assertTrue(result.isEmpty());

        verify(this.documentRepository, times(1)).listAll();
        verify(this.documentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("test06GetAllDocuments_ShouldMapAndReturnList")
    void test06GetAllDocuments_ShouldMapAndReturnList() {
        Document doc = createTestDocument(3L, new byte[]{8});
        DocumentDTO dto = createTestDTO(3L);

        when(this.documentRepository.listAll()).thenReturn(List.of(doc));
        when(this.documentMapper.toDTO(doc)).thenReturn(dto);

        List<DocumentDTO> result = this.documentService.getAllDocuments();

        assertEquals(1, result.size());
        assertEquals(dto, result.getFirst());

        verify(this.documentRepository, times(1)).listAll();
        verify(this.documentMapper, times(1)).toDTO(doc);
    }

    @Test
    @DisplayName("test07GetDocumentsByOwner_ShouldReturnEmptyListWhenNone")
    void test07GetDocumentsByOwner_ShouldReturnEmptyListWhenNone() {
        when(this.documentRepository.findByOwner("ownerX")).thenReturn(Collections.emptyList());

        List<DocumentDTO> result = this.documentService.getDocumentsByOwner("ownerX");

        assertTrue(result.isEmpty());

        verify(this.documentRepository, times(1)).findByOwner("ownerX");
        verify(this.documentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("test08GetDocumentsByOwner_ShouldMapAndReturnList")
    void test08GetDocumentsByOwner_ShouldMapAndReturnList() {
        Document doc = createTestDocument(4L, new byte[]{9});
        DocumentDTO dto = createTestDTO(4L);

        when(this.documentRepository.findByOwner("ownerY")).thenReturn(List.of(doc));
        when(this.documentMapper.toDTO(doc)).thenReturn(dto);

        List<DocumentDTO> result = this.documentService.getDocumentsByOwner("ownerY");

        assertEquals(1, result.size());
        assertEquals(dto, result.getFirst());

        verify(this.documentRepository, times(1)).findByOwner("ownerY");
        verify(this.documentMapper, times(1)).toDTO(doc);
    }
}
