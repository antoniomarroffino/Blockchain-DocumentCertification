package ch.supsi.model.api;

public class MimeTypeWithContent {
    private final String mimeType;
    private final byte[] content;

    public MimeTypeWithContent(String mimeType, byte[] content) {
        this.mimeType = mimeType;
        this.content = content;
    }

    public String getMimeType() {
        return mimeType;
    }

    public byte[] getContent() {
        return content;
    }
}

