package ch.supsi.controller;

import ch.supsi.model.api.MimeTypeWithContent;
import ch.supsi.model.dto.DocumentDTO;
import ch.supsi.model.dto.UploadFormDTO;
import ch.supsi.service.IDocumentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.IOException;
import java.util.List;

@Path("/documents")
public class DocumentController {
    @Inject
    IDocumentService documentService;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Upload a document")
    @APIResponse(
            responseCode = "200",
            description = "Upload of document",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = DocumentDTO.class)
            )
    )
    public Response uploadDocument(@MultipartForm UploadFormDTO uploadFormDTO) {
        DocumentDTO createdDocumentDTO;
        try {
            createdDocumentDTO = this.documentService.createDocument(uploadFormDTO);
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok(createdDocumentDTO).build();
    }

    @GET
    @Path("/{id}/content")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Operation(summary = "Download raw bytes of a document")
    @APIResponse(
            responseCode = "200",
            description = "Raw binary content",
            content = @Content(
                    mediaType = MediaType.APPLICATION_OCTET_STREAM,
                    schema = @Schema(type = SchemaType.STRING, format = "binary")
            )
    )
    public Response downloadContent(@PathParam("id") Long id) {
        MimeTypeWithContent result = documentService.getDocumentContentWithType(id);
        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response
                .ok(result.getContent())
                .type(result.getMimeType())
                .build();
    }

    @GET
    @Operation(summary = "Get all documents")
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponse(
            responseCode = "200",
            description = "List of documents",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = DocumentDTO.class)
            )
    )
    public Response getAllDocuments() {
        List<DocumentDTO> docsDTO = this.documentService.getAllDocuments();
        return Response.ok(docsDTO).build();
    }

    @GET
    @Path("/mine/{ownerWallet}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all documents of user")
    @APIResponse(
            responseCode = "200",
            description = "List of documents of user given his wallet's address",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = DocumentDTO.class)
            )
    )
    public Response getDocumentsByOwner(@PathParam("ownerWallet") String ownerWallet) {
        List<DocumentDTO> docsDTO = this.documentService.getDocumentsByOwner(ownerWallet);
        return Response.ok(docsDTO).build();
    }
}
