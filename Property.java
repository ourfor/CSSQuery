package html;

public class Property {
    private String property;
    private HtmlBean content;

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public HtmlBean getContent() {
        return content;
    }

    public void setContent(HtmlBean content) {
        this.content = content;
    }

    public Property(String property, HtmlBean content) {
        this.property = property;
        this.content = content;
    }
}
