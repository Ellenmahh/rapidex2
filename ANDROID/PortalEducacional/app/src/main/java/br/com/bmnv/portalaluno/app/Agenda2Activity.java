package br.com.bmnv.portalaluno.app;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class Agenda2Activity extends AppCompatActivity {

    ListView list_view_anotacao;
    List<Integer> listaIdAnotacoes = new ArrayList<>();
    List<Anotacao> listaDeAnotacoes = new ArrayList<>();

    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_agenda2);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);



        context = this;

        list_view_anotacao = (ListView)findViewById(R.id.list_view_anotacoes);

        configurarClickLista();
        buscarAnotacoesBanco();
        preencherAdpter(listaDeAnotacoes);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Agenda2Activity.this, NovaAnotacaoActivity.class);
                startActivity(intent);
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    private void buscarAnotacoesBanco() {
        SQLiteDatabase db = new DataBaseHelper(context).getReadableDatabase();

        String comandoSql = "SELECT * FROM tblanotacoes ORDER BY titulo ASC;";
        Cursor cursor = db.rawQuery(comandoSql, null);

        //verificar se veio algum registro
        if(cursor.getCount() > 0 ){
            cursor.moveToFirst();

            for(int i =0 ; i < cursor.getCount(); i++){


                listaIdAnotacoes.add(cursor.getInt(0)); //acessando a coluna

                String titulo = cursor.getString(1);
                String anotacao;

                if(cursor.getString(2).length() > 50){
                    anotacao = cursor.getString(2).substring(0,46) + "...";
                }else{
                    anotacao = cursor.getString(2) + "...";
                }

                listaDeAnotacoes.add(new Anotacao(titulo, anotacao));


                cursor.moveToNext();
            }
        }
        cursor.close();
        //fim do select


    }

    private void preencherAdpter(List<Anotacao> listaDeAnotacoes) {
        AnotacoesAdapter adapter =  new AnotacoesAdapter(
                context,
                R.layout.list_item_anotacao_customizado,
                listaDeAnotacoes);

        list_view_anotacao.setAdapter(adapter);
    }

    private void configurarClickLista() {
        list_view_anotacao.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                Integer idAnotacao = listaIdAnotacoes.get(position);

                Intent intent = new Intent(context, DetalhesActivity.class);
                intent.putExtra("idAnotacao", idAnotacao);
                startActivity(intent);

            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);

        SearchView sv  = new SearchView(this);
        sv.setQueryHint("O que está procutando?");
        sv.setOnQueryTextListener(new SearchFiltro());

        MenuItem itemum = menu.add(0,0,0,"item 1");
        itemum.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
        itemum.setActionView(sv);

        return true;
    }

    private class SearchFiltro implements SearchView.OnQueryTextListener{

        @Override
        public boolean onQueryTextSubmit(String query) {

            String comandoSql = "";
            if(query.isEmpty()){
                comandoSql = "select * from tblanotacoes";


            }else{

                comandoSql = "select * from tblanotacoes where titulo like '%" + query + "%'";


            }

            buscarDadosBancoPesquisa(comandoSql);

            return false;
        }

        @Override
        public boolean onQueryTextChange(String newText) {

            String comandoSql = "";
            if(newText.isEmpty()){

                comandoSql = "select * from tblanotacoes";


            }else{

                comandoSql = "select * from tblanotacoes where titulo like '%" + newText + "%';";


            }

            buscarDadosBancoPesquisa(comandoSql);

            return false;
        }
    }

    private void buscarDadosBancoPesquisa(String comandoSql) {

        listaDeAnotacoes.clear();
        listaIdAnotacoes.clear();
        SQLiteDatabase db = new DataBaseHelper(context).getReadableDatabase();

        Cursor cursor = db.rawQuery(comandoSql, null);

        if(cursor.getCount() > 0 ){
            cursor.moveToFirst();

            for(int i =0 ; i < cursor.getCount(); i++){

                listaIdAnotacoes.add(cursor.getInt(0)); //acessando a coluna
                String titulo = cursor.getString(1);
                String anotacao;

                if(cursor.getString(2).length() > 50){
                    anotacao = cursor.getString(2).substring(0,46) + "...";
                }else{
                    anotacao = cursor.getString(2) + "...";
                }

                listaDeAnotacoes.add(new Anotacao(titulo, anotacao));

                cursor.moveToNext();
            }
        }
        cursor.close();

        preencherAdpter(listaDeAnotacoes);
    }

}
