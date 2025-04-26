package ch.supsi.model.api;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Document {
    @Id @GeneratedValue private Long id;
    private String title;
    private String ownerWallet;
    private Instant uploadTimestamp;
    @Lob
    @Column(name = "content", columnDefinition = "LONGBLOB")
    private byte[] content;
    private String hash;

    public Document() {
    }

    public Document(Long id, String title, String ownerWallet, Instant uploadTimestamp,  byte[] content, String hash) {
        this.id = id;
        this.title = title;
        this.ownerWallet = ownerWallet;
        this.uploadTimestamp = uploadTimestamp;
        this.content = content;
        this.hash = hash;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwnerWallet() {
        return this.ownerWallet;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public Instant getUploadTimestamp() {
        return this.uploadTimestamp;
    }

    public void setUploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }

    public byte[] getContent() {
        return this.content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}
