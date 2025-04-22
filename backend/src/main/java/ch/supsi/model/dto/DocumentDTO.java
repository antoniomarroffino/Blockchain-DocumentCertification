package ch.supsi.model.dto;

import io.quarkus.runtime.annotations.RegisterForReflection;
import io.vertx.mutiny.ext.web.FileUpload;


import java.io.File;
import java.time.Instant;

@RegisterForReflection
public class DocumentDTO {
    private Long id;
    private String title;
    private String ownerWallet;
    private Instant uploadTimestamp;

    public DocumentDTO() {
    }

    public DocumentDTO(Long id, String title, String ownerWallet, Instant uploadTimestamp) {
        this.id = id;
        this.title = title;
        this.ownerWallet = ownerWallet;
        this.uploadTimestamp = uploadTimestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwnerWallet() {
        return ownerWallet;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public Instant getUploadTimestamp() {
        return uploadTimestamp;
    }

    public void setUploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }
}
