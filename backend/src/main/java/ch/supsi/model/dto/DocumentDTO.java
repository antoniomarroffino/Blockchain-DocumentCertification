package ch.supsi.model.dto;

import io.quarkus.runtime.annotations.RegisterForReflection;
import io.vertx.mutiny.ext.web.FileUpload;


import java.io.File;

@RegisterForReflection
public class DocumentDTO {
    private String title;
    private String ownerWallet;

    public DocumentDTO() {
    }

    public DocumentDTO(String title, String ownerWallet) {
        this.title = title;
        this.ownerWallet = ownerWallet;
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
}
