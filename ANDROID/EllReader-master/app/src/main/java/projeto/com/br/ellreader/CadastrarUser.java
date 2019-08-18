package projeto.com.br.ellreader;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class CadastrarUser extends AppCompatActivity {

    EditText txt_login,txt_login_senha,txt_login_tel,txt_login_email;
    String login, senha, telefone, email, json;
    Context context;
    String server;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastrar_user);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        context = this;

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                login = txt_login.getText().toString();
                senha = txt_login_senha.getText().toString();
                telefone = txt_login_tel.getText().toString();
                email = txt_login_email.getText().toString();
                new inserirNovoUser().execute();

            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        txt_login = (EditText) findViewById(R.id.txt_login);
        txt_login_senha = (EditText) findViewById(R.id.txt_login_senha);
        txt_login_tel = (EditText) findViewById(R.id.txt_login_tel);
        txt_login_email = (EditText) findViewById(R.id.txt_login_email);

    }

    private class inserirNovoUser extends AsyncTask<Void,Void,Void>{

        @Override
        protected Void doInBackground(Void... params) {
            server = CadastrarUser.this.getString(R.string.endServidor) + "cadastrarUser.php?usuario=" +login+"&senha="+senha+"&telefone="+telefone+"&email=" + email;
            json = HttpConnection.get(server);


            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            if(json.isEmpty()){
                Toast.makeText(context, "Cadastrado com sucesso",Toast.LENGTH_SHORT).show();
                startActivity(new Intent(context,MainActivity.class));
            }else{
                Toast.makeText(context, "Erro ao cadastrar",Toast.LENGTH_SHORT).show();
                startActivity(new Intent(context, CadastrarUser.class));
            }


        }
    }



}
