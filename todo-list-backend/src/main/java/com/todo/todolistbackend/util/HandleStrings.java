package com.todo.todolistbackend.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class HandleStrings {
    public static String generateCode(String name,long  total){
        String code = removeDiacritics(name) + " " + total;
        return strToCode(code);
    }
    private static String removeDiacritics(String str) {
        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");
    }
    private static String strToCode(String str) {
        str = removeDiacritics(str);
        String[] codes = str.trim().split(" ");
        StringBuffer code = new StringBuffer();
        if(codes.length < 1) {
            return codes[0].toLowerCase();
        }
        for(int i =0; i < codes.length;i++) {
            if(i == codes.length -1) {
                code.append(codes[i].toLowerCase());
            }
            else {
                code.append(codes[i].toLowerCase() + "-");
            }

        }
        return code.toString();
    }
    private static String strToLower(String name){
        return name.toLowerCase();
    }
}
