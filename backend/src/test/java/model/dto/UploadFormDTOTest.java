package model.dto;

import ch.supsi.model.dto.UploadFormDTO;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.MethodName.class)
public class UploadFormDTOTest {
    @Test
    @DisplayName("test00DefaultValuesAreNull")
    void test00DefaultValuesAreNull() {
        UploadFormDTO dto = new UploadFormDTO();
        assertNull(dto.getTitle(), "Title should be null by default");
        assertNull(dto.getOwnerWallet(), "OwnerWallet should be null by default");
        assertNull(dto.getHash(), "Hash should be null by default");
        assertNull(dto.getFile(), "File should be null by default");
    }

    @Test
    @DisplayName("test01DefaultConstructorAndSetters")
    void test01DefaultConstructorAndSetters() {
        UploadFormDTO dto = new UploadFormDTO();
        dto.setTitle("TestTitle");
        assertEquals("TestTitle", dto.getTitle());

        dto.setOwnerWallet("owner123");
        assertEquals("owner123", dto.getOwnerWallet());

        dto.setHash("hashXYZ");
        assertEquals("hashXYZ", dto.getHash());

        InputStream stream = new ByteArrayInputStream(new byte[]{1, 2, 3});
        dto.setFile(stream);
        assertSame(stream, dto.getFile(), "File InputStream should match the one set");
    }

    @Test
    @DisplayName("test02AllArgsConstructorAndGetters")
    void test02AllArgsConstructorAndGetters() {
        InputStream stream = new ByteArrayInputStream(new byte[]{4, 5, 6});
        UploadFormDTO dto = new UploadFormDTO("TitleA", "ownerA", "hashA", stream);

        assertEquals("TitleA", dto.getTitle(), "Constructor did not set title correctly");
        assertEquals("ownerA", dto.getOwnerWallet(), "Constructor did not set ownerWallet correctly");
        assertEquals("hashA", dto.getHash(), "Constructor did not set hash correctly");
        assertSame(stream, dto.getFile(), "Constructor did not set file InputStream correctly");
    }
}
