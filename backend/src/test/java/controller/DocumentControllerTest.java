package controller;

import ch.supsi.controller.DocumentController;
import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;
import ch.supsi.service.IDocumentService;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
public class DocumentControllerTest {
    @Inject
    DocumentController documentController;

    @InjectMock
    IDocumentService documentService;

    @Test
    @DisplayName("test01UploadDocument_Success")
    void test01UploadDocument_Success() throws IOException {
        UploadFormDTO form = new UploadFormDTO();
        DocumentDTO dto = new DocumentDTO();

        when(this.documentService.createDocument(any(UploadFormDTO.class))).thenReturn(dto);

        Response response = this.documentController.uploadDocument(form);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals(dto, response.getEntity());

        verify(this.documentService, times(1)).createDocument(form);
    }

    @Test
    @DisplayName("test02UploadDocument_InternalError")
    void test02UploadDocument_InternalError() throws IOException {
        UploadFormDTO form = new UploadFormDTO();

        when(this.documentService.createDocument(any())).thenThrow(new IOException("fail"));

        Response response = this.documentController.uploadDocument(form);

        assertEquals(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), response.getStatus());
        assertNull(response.getEntity());

        verify(this.documentService, times(1)).createDocument(form);
    }

    @Test
    @DisplayName("test03DownloadContent_NotFound")
    void test03DownloadContent_NotFound() {
        when(this.documentService.getContentBytesByDocumentId(123L)).thenReturn(null);
        Response response = this.documentController.downloadContent(123L);
        assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());
        assertNull(response.getEntity());
        verify(this.documentService, times(1)).getContentBytesByDocumentId(123L);
    }

    @Test
    @DisplayName("test04DownloadContent_Success")
    void test04DownloadContent_Success() {
        byte[] content = new byte[]{1, 2, 3};
        when(this.documentService.getContentBytesByDocumentId(456L)).thenReturn(content);
        Response response = this.documentController.downloadContent(456L);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertArrayEquals(content, (byte[]) response.getEntity());

        verify(this.documentService, times(1)).getContentBytesByDocumentId(456L);
    }

    @Test
    @DisplayName("test05GetAllDocuments_Empty")
    void test05GetAllDocuments_Empty() {
        when(this.documentService.getAllDocuments()).thenReturn(Collections.emptyList());

        Response response = this.documentController.getAllDocuments();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertTrue(((List<?>) response.getEntity()).isEmpty());

        verify(this.documentService, times(1)).getAllDocuments();
    }

    @Test
    @DisplayName("test06GetAllDocuments_WithResults")
    void test06GetAllDocuments_WithResults() {
        DocumentDTO dto = new DocumentDTO();

        when(this.documentService.getAllDocuments()).thenReturn(List.of(dto));

        Response response = this.documentController.getAllDocuments();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        List<?> list = (List<?>) response.getEntity();
        assertEquals(1, list.size());
        assertEquals(dto, list.getFirst());

        verify(this.documentService, times(1)).getAllDocuments();
    }

    @Test
    @DisplayName("test07GetDocumentsByOwner_Empty")
    void test07GetDocumentsByOwner_Empty() {
        when(this.documentService.getDocumentsByOwner("ownerX")).thenReturn(Collections.emptyList());

        Response response = this.documentController.getDocumentsByOwner("ownerX");

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertTrue(((List<?>) response.getEntity()).isEmpty());

        verify(this.documentService, times(1)).getDocumentsByOwner("ownerX");
    }

    @Test
    @DisplayName("test08GetDocumentsByOwner_WithResults")
    void test08GetDocumentsByOwner_WithResults() {
        DocumentDTO dto = new DocumentDTO();

        when(this.documentService.getDocumentsByOwner("ownerY")).thenReturn(List.of(dto));

        Response response = this.documentController.getDocumentsByOwner("ownerY");

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        List<?> list = (List<?>) response.getEntity();
        assertEquals(1, list.size());
        assertEquals(dto, list.getFirst());

        verify(this.documentService, times(1)).getDocumentsByOwner("ownerY");
    }
}
