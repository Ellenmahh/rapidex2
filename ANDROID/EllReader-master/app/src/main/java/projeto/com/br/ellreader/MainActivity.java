package projeto.com.br.ellreader;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.Gson;

public class MainActivity extends AppCompatActivity {

    Context context;
    EditText txt_usuario, txt_senha;
    Button btnEntrar;
    LivroAdapter adapter;
    String usuario, senha;
    String json;
    public static usuario user;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        context = this;

        txt_usuario = (EditText) findViewById(R.id.txt_usuario);
        txt_senha = (EditText) findViewById(R.id.txt_senha);
        btnEntrar = (Button) findViewById(R.id.btnEntrar);



        btnEntrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                usuario = txt_usuario.getText().toString();
                senha = txt_senha.getText().toString();
                new logar().execute();
            }
        });
    }



    private class logar extends AsyncTask<Void,Void,Void> {
        ProgressDialog progressDialog;

        Integer idUsuario;
        private void showProgressDialog() {
            progressDialog = new ProgressDialog(context,R.style.CustomDialog);
            //progressDialog = new ProgressDialog(context);

            progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            progressDialog.setMessage("Estamos preparando tudo pra você");
            progressDialog.setIcon( R.drawable.logo);
            progressDialog.show();

        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            showProgressDialog();

        }

        @Override
        protected Void doInBackground(Void... params) {

            String server =  MainActivity.this.getString(R.string.endServidor)+ "logar.php?usuario="+usuario+"&senha="+senha;
            json = HttpConnection.get(server);

            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {

            if(json.isEmpty()){
                Intent intent = new Intent(context, MainActivity.class);
                startActivity(intent);
                Toast.makeText(context, "Usuário ou senha inválidos", Toast.LENGTH_SHORT).show();

            }else{
                Gson gson = new Gson();
                user = gson.fromJson(json, usuario.class);

                Intent intent = new Intent(context, GridViewActivity.class);
                startActivity(intent);
                progressDialog.dismiss();
            }

        }
    }

    public void CadastrarUser(View view) {
        startActivity(new Intent(this,CadastrarUser.class));
    }

}



