package br.com.bmnv.portalaluno.app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.design.widget.Snackbar;
import android.support.v4.util.LruCache;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class RendimentoActivity extends AppCompatActivity {

    String id_aluno, matricula, nome, dt_nasc, cpf, senha, email_aluno, foto, genero, email_institucional, id_turma, nome_turma, dataFinal, curso, nota, materia;
    String id_materia;
    SharedPreferences preferences;
    TextView curso_aluno, nome_aluno, turma_aluno, nome_professor, notaFinal;
    Context context;
    String parametros, url = "";
    List<NomesMaterias> lista_materia = new ArrayList<>();

    Spinner spn_materias, spn_escola;
    ArrayAdapter<NomesMaterias> adapter;

    View v;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rendimento);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        preferences = PreferenceManager.getDefaultSharedPreferences(this);

        context = this;

        getExtras();
        findViews();
        carregarMaterias();

        nome_aluno.setText(nome);
        curso_aluno.setText(curso);
        turma_aluno.setText(nome_turma);

        spn_materias.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                NomesMaterias nome = adapter.getItem(position);

                id_materia = nome.getId_materia();

                buscarNotas();

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

    }

    private void getExtras() {

        id_aluno = preferences.getString("id_aluno", "");
        matricula = preferences.getString("matricula", "");
        nome = preferences.getString("nome", "");

        dt_nasc = preferences.getString("dt_nasc", "");
        String data[] = dt_nasc.split("-");
        dataFinal = data[2] + "/" + data[1] + "/" + data[0];

        cpf = preferences.getString("cpf", "");
        senha = preferences.getString("senha", "");
        email_aluno = preferences.getString("email", "");
        foto = preferences.getString("foto", "");
        genero = preferences.getString("genero", "");

        id_turma = preferences.getString("id_turma", "");

        email_institucional = preferences.getString("email_institucional", "");
        nome_turma = preferences.getString("nome_turma", "");
        curso = preferences.getString("nome_curso", "");

    }

    private void findViews() {

        curso_aluno = (TextView) findViewById(R.id.txt_curso_aluno);
        nome_aluno = (TextView) findViewById(R.id.txt_nome_aluno);
        turma_aluno = (TextView) findViewById(R.id.txt_turma);
        spn_materias = (Spinner) findViewById(R.id.spinner_materias);

        nome_professor = (TextView) findViewById(R.id.txt_nome_professor);
        notaFinal = (TextView) findViewById(R.id.txt_nota);

    }

    private void carregarMaterias() {

        ConnectivityManager connMgr = (ConnectivityManager)this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()){

            url =  this.getString(R.string.link)+"carregar_materias.php";

            parametros = "id_turma=" + id_turma;

            new RendimentoActivity.Preencher_materias().execute(url);

        }else{

            Toast.makeText(this, "Nenhuma Conexao foi detectada", Toast.LENGTH_LONG).show();
        }

    }

    private class Preencher_materias extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... urls){

            return Conexao.postDados(urls[0], parametros);

        }

        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String resultado){

            Gson gson = new Gson();
            NomesMaterias[] materias = gson.fromJson(resultado, NomesMaterias[].class);



            for(int i = 0; i < materias.length;i++){

                lista_materia.add(materias[i]);

            }

            adapter = new ArrayAdapter<NomesMaterias>(
                    context,
                    android.R.layout.simple_spinner_item,
                    lista_materia);
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            spn_materias.setAdapter(adapter);

        }

    }

    private void buscarNotas() {

        ConnectivityManager connMgr = (ConnectivityManager)this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()){

            url =  this.getString(R.string.link)+"rendimento.php";

            parametros = "id_aluno=" + id_aluno + "&id_materia=" + id_materia;

            new RendimentoActivity.Preencher_notas().execute(url);

        }else{

            Toast.makeText(this, "Nenhuma Conexao foi detectada", Toast.LENGTH_LONG).show();
        }

    }

    private class Preencher_notas extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... urls){

            return Conexao.postDados(urls[0], parametros);

        }

        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String resultado){

            if(resultado.contains("erro")){

                Snackbar.make(curso_aluno, "Notas indisponíveis :( ...", Snackbar.LENGTH_INDEFINITE).setAction("Fechar", new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent intent = new Intent(context, HomeActivity.class);
                        startActivity(intent);
                    }
                }).show();

            } else {

                Gson gson = new Gson();
                RelatorioRendimento[] professor_nota = gson.fromJson(resultado, RelatorioRendimento[].class);

                String professor = professor_nota[0].getNome_professor();
                String nota = professor_nota[0].getNota();

                nome_professor.setText(professor);
                notaFinal.setText(nota);

            }

        }

    }

}
