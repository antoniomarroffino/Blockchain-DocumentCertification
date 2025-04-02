package ch.supsi.repository;

import ch.supsi.model.document.Document;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class DocumentRepository implements PanacheRepository<Document> {
    public List<Document> findByOwner(String ownerWallet) {
        return list("owner", ownerWallet);
    }
}