package br.com.bmnv.portalaluno.app;

import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.text.SimpleDateFormat;

public class DetalhesActivity extends AppCompatActivity {

    EditText edit_titulo, edit_anotacao;
    TextView text_data;
    Context context;
    Integer idAnotacao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalhes);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        context = this;

        edit_titulo = (EditText)findViewById(R.id.edit_titulo);
        edit_anotacao = (EditText)findViewById(R.id.edit_anotacao);
        text_data = (TextView)findViewById(R.id.text_data);

        Intent intent = getIntent();
        idAnotacao = intent.getIntExtra("idAnotacao", 0);

        buscarDadosBancoDetalhes();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                editarAnotacao();

            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    private void editarAnotacao() {
        SQLiteDatabase db = new DataBaseHelper(context).getWritableDatabase();

        ContentValues valores = new ContentValues();
        valores.put("titulo", edit_titulo.getText().toString());
        valores.put("anotacao", edit_anotacao.getText().toString());
        valores.put("data", pegarDataSql());

        db.update("tblanotacoes", valores, "_id = ?", new String[]{idAnotacao.toString()});

        Toast.makeText(context , "Editado com sucesso", Toast.LENGTH_SHORT ).show();


        Intent intent = new Intent(context, Agenda2Activity.class);
        intent.putExtra("idAnotacao", idAnotacao);
        startActivity(intent);
    }

    public boolean onCreateOptionsMenu(Menu menu) {

        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.menu_detalhes, menu);
        return true;
    }

    private void buscarDadosBancoDetalhes() {
        SQLiteDatabase db = new DataBaseHelper(this).getReadableDatabase();

        Cursor cursor = db.rawQuery("select * from tblanotacoes where _id = ?",
                new String[]{idAnotacao.toString()});

        if(cursor.getCount() > 0){
            cursor.moveToFirst();
            String titulo = cursor.getString(1);
            String anotacao = cursor.getString(2);
            String data = cursor.getString(3);


            edit_titulo.setText(titulo);
            edit_anotacao.setText(anotacao);
            text_data.setText(data);


            cursor.close();
        }else{
            Toast.makeText(this, "Erro, tente novamente mais tarde", Toast.LENGTH_SHORT).show();
        }
        //fim select
    }

    private String pegarDataSql() {
        long date = System.currentTimeMillis();
        SimpleDateFormat dataFormatada = new SimpleDateFormat("d/MM/yyyy - HH:mm:ss");
        String dateFormat = dataFormatada.format(date);


        return dateFormat;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case R.id.menu_excluir :
                confirmarEcluir();
                break;

        }

        return super.onOptionsItemSelected(item);
    }

    private void confirmarEcluir(){

        //Criar caixa de dialogo
        new AlertDialog.Builder(this).setTitle("Deletar")
                .setIcon(android.R.drawable.ic_dialog_alert)
                .setMessage("Tem certeza que deseja excluir essa anotação? ")
                .setPositiveButton("Sim", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        excluirAnotacao();
                    }
                })
                .setNegativeButton("Não", null).show();

    }

    private void excluirAnotacao() {


        SQLiteDatabase db = new DataBaseHelper(this).getWritableDatabase();
        db.delete("tblanotacoes","_id = ?", new String[]{ idAnotacao.toString()});

        Toast.makeText(this, "Registro Apagado!", Toast.LENGTH_LONG).show();

        Intent intent = new Intent(this, Agenda2Activity.class);
        startActivity(intent);

    }

}
