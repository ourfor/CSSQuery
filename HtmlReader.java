package html;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.jsoup.nodes.*;
import org.jsoup.*;
import org.jsoup.select.Elements;
import com.alibaba.fastjson.*;



public class HtmlReader {
    public static void main(String args[]){
        File url = new File("/Users/sagit/Desktop/json","url.txt");
        try{
            InputStream is = new FileInputStream(url);
            Scanner input = new Scanner(is);
//            System.out.println(input.nextLine());
            while(input.hasNextLine()){
                HtmlReader reader = new HtmlReader();
                String currURL = input.nextLine();
                System.out.println(currURL);
                reader.read(currURL);
            }

            System.out.println("文件写入完毕");
        }
        catch(Exception e){
            System.out.println(e.toString());
        }

    }

    public static void write(File file, String content, String encoding)
            throws IOException {
        file.delete();
        file.createNewFile();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream(file), encoding));
        writer.write(content);
        writer.close();
    }

    public void read(String uri){
        try {
            String attr_name = uri.substring(uri.lastIndexOf("/")+1,uri.length()-4);
//            System.out.println(attr_name);
            Document doc = Jsoup.connect(uri).get();
            Element value = doc.getElementById("value");
            Elements names = value.getElementsByTag("dt");
            Elements values = value.getElementsByTag("dd");
            List<KeyValue> Value = new ArrayList<KeyValue>();
            for(int i=0;i<names.size();i++) {
                String name_db = names.get(i).text().substring(0,names.get(i).text().length()-1);
                String value_db = values.get(i).text();
//                System.out.println(name_db+":"+value_db);
                Value.add(new KeyValue(name_db,value_db));
            }

            HtmlBean display = new HtmlBean();
            display.setValue(Value);


            Element syntax = doc.getElementById("syntax");
            Elements syntax_name = syntax.getElementsByTag("strong");
            Elements syntax_value = syntax.getElementsByTag("p");

            List<KeyValue> Grammar = new ArrayList<KeyValue>();
            for(int i=0;i<syntax_name.size();i++){
                String name_db = syntax_name.get(i).text();
                String value_db = syntax_value.get(i).text();
                value_db = value_db.replace(name_db+"：","");
//                System.out.println(name_db+":"+value_db);
                Grammar.add(new KeyValue(name_db,value_db));
            }
            display.setGrammar(Grammar);

            List<String> Intro = new ArrayList<String>();

            Element intro = doc.getElementById("intro");
            String descri = intro.getElementsByTag("strong").text();
            Elements intro_li = intro.getElementsByTag("li");
            Intro.add(descri);

            for(Element i : intro_li){
                Intro.add(i.text());
            }

            Element example = doc.getElementById("example");
            String html_code = example.getElementsByTag("textarea").text();

            display.setExample(html_code);

            display.setHasChild(false);

            display.setIntroduction(Intro);

            Property property = new Property(attr_name,display);
            String jsonContent = JSON.toJSONString(property);

            File SaveJson = new File("/Users/sagit/Desktop/json",attr_name+".json");

            write(SaveJson,jsonContent,"UTF-8");



//            System.out.println(JSON.toJSONString(display));

        }
        catch(Exception e){
            System.out.println(""+e.toString());
        }
    }
}
