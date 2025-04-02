package ch.supsi.model.document;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Document extends PanacheEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;
    private String ownerWallet;
    private Instant uploadTimestamp;
    @Lob
    public byte[] content;

    public Document() {
    }

    public Document(int id, String title, String ownerWallet, Instant uploadTimestamp,  byte[] content) {
        this.id = id;
        this.title = title;
        this.ownerWallet = ownerWallet;
        this.uploadTimestamp = uploadTimestamp;
        this.content = content;
    }

    public int getId() {
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
}
