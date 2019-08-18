package br.com.gastometro.app;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sn1041520 on 22/09/2016.
 */
public class Categoria {

    private int id;
    private String nome;
    private String icone;

    @Override
    public String toString() {
        return nome;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIcone() {
        return icone;
    }

    public void setIcone(String icone) {
        this.icone = icone;
    }


    public static Categoria buscarCategoria(Context context, int idCategoria){

        SQLiteDatabase db = new DatabaseHelper(context).getReadableDatabase();

        Cursor cursor = db.rawQuery("SELECT * FROM categoria WHERE _id = ?;",
                new String[]{ idCategoria+"" });

        if(cursor.getCount() > 0){

            cursor.moveToFirst();

            Categoria c = new Categoria();
            c.setId(cursor.getInt(0));
            c.setNome(cursor.getString(1));

            cursor.close();

            return c;
        }

        return null;
    }

    public static void preencherSpinnerCategoria(Context context, Spinner spinner, ArrayAdapter<Categoria> adapter){

        SQLiteDatabase db = new DatabaseHelper(context).getReadableDatabase();

        Cursor cursor = db.rawQuery("SELECT * FROM categoria;", null);
        cursor.moveToFirst();

        List<Categoria> lstCategorias= new ArrayList<>();
        for(int i = 0; i < cursor.getCount() ; i++){

            Categoria cat = new Categoria();
            cat.setId(cursor.getInt(0));
            cat.setNome(cursor.getString(1));

            lstCategorias.add(cat);

            cursor.moveToNext();
        }
        cursor.close();


        if (adapter == null) {
            adapter = new ArrayAdapter<Categoria>(
                    context, //contexto
                    android.R.layout.simple_spinner_item, //layout do spinner
                    lstCategorias
            );
        }else{
            adapter.addAll(lstCategorias);
        }
        adapter.setDropDownViewResource(android.R.
                layout.simple_spinner_dropdown_item);


        spinner.setAdapter(adapter);
    }


}
