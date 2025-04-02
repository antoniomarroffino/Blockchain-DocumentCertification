package ch.supsi.controller;

import ch.supsi.model.document.Document;
import ch.supsi.model.dto.DocumentDTO;
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

import java.util.List;

@Path("/documents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DocumentController {
    @Inject
    IDocumentService documentService;

    @POST
    @Operation(summary = "Upload a document")
    @APIResponse(
            responseCode = "200",
            description = "Upload of document",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = Document.class)
            )
    )
    public Response uploadDocument(DocumentDTO documentDTO) {
        Document createdDocument = this.documentService.createDocument(documentDTO);
        return Response.ok(createdDocument).build();
    }

    @GET
    @Operation(summary = "Get all documents")
    @APIResponse(
            responseCode = "200",
            description = "List of documents",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = Document.class)
            )
    )
    public Response getAllDocuments() {
        List<Document> docs = this.documentService.getAllDocuments();
        return Response.ok(docs).build();
    }

    @GET
    @Path("/mine/{ownerWallet}")
    @Operation(summary = "Get all documents of user")
    @APIResponse(
            responseCode = "200",
            description = "List of documents of user given his wallet's address",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = Document.class)
            )
    )
    public Response getDocumentsByOwner(@PathParam("ownerWallet") String ownerWallet) {
        System.out.println(ownerWallet);
        List<Document> docs = this.documentService.getDocumentsByOwner(ownerWallet);
        return Response.ok(docs).build();
    }
}
