package br.com.bmnv.portalaluno.app;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

public class MeuPerfilActivity extends AppCompatActivity {

    String id_aluno, matricula, nome, dt_nasc, cpf, senha, email_aluno, foto, genero, email_institucional, id_turma, nome_turma, emailEdit, curso;
    TextView matricula_aluno, nome_aluno, dt_nasc_aluno, cpf_aluno, senha_aluno, genero_aluno, email_institucional_aluno, turma_aluno,nome_curso;
    EditText email;
    Context context;
    ImageView imageView;
    SharedPreferences preferences;
    String url = "";
    String parametros = "";
    String dataFinal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_meu_perfil);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        context = this;

        preferences = PreferenceManager.getDefaultSharedPreferences(this);

        findViews();
        getExtras();

        email.setText(email_aluno);
        nome_curso.setText(curso);
        matricula_aluno.setText(matricula);
        nome_aluno.setText(nome);
        dt_nasc_aluno.setText(dataFinal);
        cpf_aluno.setText(cpf);
        senha_aluno.setText(senha);
        genero_aluno.setText(genero);
        email_institucional_aluno.setText(email_institucional);
        url = foto;

        Picasso.with(this)
                .load(url)
                .resize(200, 150)
                .centerCrop()
                .transform(new CircleTransform())
                .into(imageView);

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
        curso = preferences.getString("nome_curso", "");


    }

    private void findViews() {

        matricula_aluno = (TextView) findViewById(R.id.txt_matricula_user);
        nome_aluno = (TextView) findViewById(R.id.txt_nome_user);
        dt_nasc_aluno = (TextView) findViewById(R.id.txt_dtNasc_user);
        cpf_aluno = (TextView) findViewById(R.id.txt_cpf_user);
        nome_curso = (TextView) findViewById(R.id.txt_curso_user);
        senha_aluno = (TextView) findViewById(R.id.txt_senha_user);
        genero_aluno = (TextView) findViewById(R.id.txt_genero);
        email_institucional_aluno = (TextView) findViewById(R.id.txt_email_institucional);
        email = (EditText) findViewById(R.id.edit_email_user);
        imageView = (ImageView) findViewById(R.id.imageView);

    }

    public void SalvarEmail(View view) {

        ConnectivityManager connMgr = (ConnectivityManager)this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()){

            emailEdit = email.getText().toString();

            url = getString(R.string.link)+"editar.php";

            parametros = "email=" + emailEdit +"&idAluno=" + id_aluno;

            new MeuPerfilActivity.SolicitaDados().execute(url);

        }else{
            Toast.makeText(this, "Nenhuma Conexao foi detectada", Toast.LENGTH_LONG).show();

        }

    }

    private class SolicitaDados extends AsyncTask<String, Void, String> {

        ProgressDialog progressDialog;
        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            progressDialog = ProgressDialog.show(context, "Aguarde...", "Estamos Trabalhando");

        }

        @Override
        protected String doInBackground(String... urls){


            return Conexao.postDados(urls[0], parametros);

        }

        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String resultado){
            progressDialog.dismiss();

            if(resultado.contains("edit_ok")){

                Toast.makeText(context, "Email alterado com sucesso", Toast.LENGTH_LONG).show();
                preferences.edit().putString("email", emailEdit).commit();

                Intent voltar = new Intent(MeuPerfilActivity.this, HomeActivity.class);

                preferences.edit().putString("id_aluno",id_aluno).commit();
                preferences.edit().putString("nome_curso", curso).commit();
                preferences.edit().putString("matricula", matricula).commit();
                preferences.edit().putString("nome", nome).commit();
                preferences.edit().putString("dt_nasc", dt_nasc).commit();
                preferences.edit().putString("cpf", cpf).commit();
                preferences.edit().putString("nome_turma", nome_turma).commit();
                preferences.edit().putString("senha", senha).commit();
                preferences.edit().putString("genero", genero).commit();
                preferences.edit().putString("email_institucional", email_institucional).commit();
                preferences.edit().putString("foto", foto).commit();

                startActivity(voltar);

            }else{
                Toast.makeText(context, "Falha ao editar email", Toast.LENGTH_LONG).show();

            }


        }

    }
}