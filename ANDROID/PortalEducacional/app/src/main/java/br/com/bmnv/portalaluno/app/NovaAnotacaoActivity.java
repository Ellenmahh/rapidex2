package br.com.bmnv.portalaluno.app;

import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.text.SimpleDateFormat;

public class NovaAnotacaoActivity extends AppCompatActivity {

    EditText  edit_titulo, edit_anotacao;
    TextView text_data;
    Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nova_anotacao);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        context = this;

        edit_titulo = (EditText)findViewById(R.id.edit_titulo);
        edit_anotacao = (EditText)findViewById(R.id.edit_anotacao);
        text_data = (TextView)findViewById(R.id.text_data);

        text_data.setText(" " + pegarDataSql());

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(edit_anotacao.getText().toString().isEmpty()){
                    Toast.makeText(context, "Impossivel salvar anotação sem conteúdo", Toast.LENGTH_SHORT).show();
                }else{
                    SalvarAnotacao();
                }

            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    private void SalvarAnotacao() {
        SQLiteDatabase db = new DataBaseHelper(context).getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put("titulo",edit_titulo.getText().toString());
        contentValues.put("anotacao",edit_anotacao.getText().toString());
        contentValues.put("data", pegarDataSql());


        db.insert("tblanotacoes", null, contentValues);

        Toast.makeText(context, "Salvo com sucesso", Toast.LENGTH_SHORT).show();

        Intent intent = new Intent(context, Agenda2Activity.class);
        startActivity(intent);
    }

    private String pegarDataSql() {
        long date = System.currentTimeMillis();
        SimpleDateFormat dataFormatada = new SimpleDateFormat("d/MM/yyyy - HH:mm:ss");
        String dateFormat = dataFormatada.format(date);


        return dateFormat;
    }


}
