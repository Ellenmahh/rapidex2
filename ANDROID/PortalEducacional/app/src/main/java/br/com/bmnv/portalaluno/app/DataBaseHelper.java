package br.com.bmnv.portalaluno.app;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by 16165872 on 15/02/2017.
 */

public class DataBaseHelper extends SQLiteOpenHelper{

    private static final String NOME_BANCO = "Anotacoes.db";
    private static  final int VERSAO = 1;
    public DataBaseHelper(Context context){

        super(context,NOME_BANCO, null, VERSAO);

    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("create table tblanotacoes( _id INTEGER primary key, " +
                "titulo TEXT, anotacao TEXT, data datetime); ");

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

}
