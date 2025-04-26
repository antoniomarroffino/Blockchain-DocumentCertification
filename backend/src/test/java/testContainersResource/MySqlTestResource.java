package testContainersResource;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.testcontainers.containers.MySQLContainer;

import java.util.Map;

public class MySqlTestResource implements QuarkusTestResourceLifecycleManager {
    private MySQLContainer<?> mysql;


    @Override
    public Map<String, String> start() {
        this.mysql = new MySQLContainer<>("mysql:8.0.34")
                .withDatabaseName("blockchainDocumentsTests")
                .withUsername("root")
                .withPassword("1234");
        this.mysql.start();

        return Map.of(
                "quarkus.datasource.jdbc.url", this.mysql.getJdbcUrl(),
                "quarkus.datasource.username", this.mysql.getUsername(),
                "quarkus.datasource.password", this.mysql.getPassword()
        );
    }

    @Override
    public void stop() {
        if (this.mysql != null) {
            this.mysql.stop();
        }
    }
}
