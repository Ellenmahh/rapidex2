package projeto.com.br.ellreader;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.util.ArrayList;

import static projeto.com.br.ellreader.MainActivity.user;

public class GridViewActivity extends AppCompatActivity {

    Context context;
    LivroAdapter adapter;
    String json, id;
    GridView gridview;

    SearchView.OnQueryTextListener buscarLivro = new SearchView.OnQueryTextListener(){

        @Override
        // é executado quando termina a busca e clica em pesquisar
        public boolean onQueryTextSubmit(String query) {

            new ObterDadosApi().execute(query);
            return false;
        }

        @Override
        // é executado a cada letra clicada
        public boolean onQueryTextChange(String newText) {
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gridview);
        //getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        context = this;

        gridview = (GridView) findViewById(R.id.gridView);

        gridview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v, int position, long id) {

                Livro livro = adapter.getItem(position);
                Intent intent = new Intent(GridViewActivity.this, AbrirLivroWebActivity.class);
                String  Abrirpdf  = livro.getPdf();
                intent.putExtra("AbrirPdf", Abrirpdf );
                startActivity(intent);

               // Download(Abrirpdf);

            }
        });

        adapter = new LivroAdapter(context,R.layout.modelo,new ArrayList<Livro>());
        gridview.setAdapter(adapter);

        new ObterDadosApi().execute();
    }



    // criação do menu 3 pontinhos
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_options,menu);

        //id do icone
        SearchView searchView = (SearchView) menu.findItem(R.id.search).getActionView();
        searchView.setQueryHint("Pesquisar..");
        searchView.setOnQueryTextListener(buscarLivro);
        return true;
    }


    //processar os clicks do menu
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_atualizar:
                Toast.makeText(this,"ATUALIZAR",Toast.LENGTH_SHORT).show();
                new ObterDadosApi().execute();
                break;

            case R.id.menu_recente:
                new adcRecentemente().execute();
                break;

            case R.id.menu_biblioteca:
                new ObterDadosApi().execute();
                break;

            case R.id.sair:
                Intent intent = new Intent(context,MainActivity.class);
                startActivity(intent);
                break;

        }

        return super.onOptionsItemSelected(item);
    }

    private class ObterDadosApi extends AsyncTask<String,Void,Void> {
        Livro[] lstLivros;
        ProgressDialog progressDialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progressDialog = ProgressDialog.show(context,"Aguarde...","Estamos Preparando tudo para você!");
        }

        @Override
        protected Void doInBackground(String... params) {
            String query = "";
            String server ="";

            if(params.length > 0){
                query = params[0];
                server =  GridViewActivity.this.getString(R.string.endServidor)+ "buscarlivro.php?q="+query;
            }else{
                server =  GridViewActivity.this.getString(R.string.endServidor)+ "API.php?idLogin="+user.getId();
            }

            String json = HttpConnection.get(server );
            Gson gson = new Gson();
            lstLivros = gson.fromJson(json, Livro[].class);

            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            adapter.clear();
            adapter.addAll(lstLivros);
            progressDialog.dismiss();

        }
    }

    private class adcRecentemente extends AsyncTask<String,Void,Void> {
        Livro[] lstLivros;
        @Override
        protected Void doInBackground(String... params) {
            String server ="";
            server =  GridViewActivity.this.getString(R.string.endServidor)+ "adcRecentemente.php";
            String json = HttpConnection.get(server);
            Gson gson = new Gson();
            lstLivros = gson.fromJson(json, Livro[].class);
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            adapter.clear();
            adapter.addAll(lstLivros);

        }
    }









}
