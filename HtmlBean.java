package html;
import java.util.List;
import java.util.ArrayList;


public class HtmlBean {
    private List<KeyValue> Grammar;
    private List<KeyValue> Value;
    private String Example;
    private Boolean hasChild;
    private List<String> Introduction;
    private String Compatibility;

    public List<KeyValue> getGrammar() {
        return Grammar;
    }

    public void setGrammar(List<KeyValue> grammar) {
        Grammar = grammar;
    }

    public List<KeyValue> getValue() {
        return Value;
    }

    public void setValue(List<KeyValue> value) {
        Value = value;
    }

    public String getExample() {
        return Example;
    }

    public void setExample(String example) {
        Example = example;
    }

    public Boolean getHasChild() {
        return hasChild;
    }

    public void setHasChild(Boolean hasChild) {
        this.hasChild = hasChild;
    }

    public List<String> getIntroduction() {
        return Introduction;
    }

    public void setIntroduction(List<String> introduction) {
        Introduction = introduction;
    }

    public String getCompatibility() {
        return Compatibility;
    }

    public void setCompatibility(String compatibility) {
        Compatibility = compatibility;
    }
}
