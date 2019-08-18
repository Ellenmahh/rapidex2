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
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class Login extends  Fragment  {

    EditText edit_cpf, edit_senha;
    Button btn_logar;

    TextView esqueci_senha;

    String url = "";
    String parametros = "";
    View view;

    SharedPreferences preferences;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.login, container, false);

        edit_cpf = (EditText)rootView.findViewById(R.id.edit_cpf);
        edit_senha = (EditText)rootView.findViewById(R.id.edit_senha);
        btn_logar = (Button)rootView.findViewById(R.id.btn_logar);
        esqueci_senha = (TextView) rootView.findViewById(R.id.esqueci_senha);

        getAplication();

        preferences = PreferenceManager.getDefaultSharedPreferences(getContext());

        return rootView;

    }



    private void getAplication() {
        esqueci_senha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getContext(), MudarSenhaActivity.class);
                startActivity(intent);
            }
        });
        btn_logar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ConnectivityManager connMgr = (ConnectivityManager)getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
                NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
                if (networkInfo != null && networkInfo.isConnected()){

                    String cpf = edit_cpf.getText().toString();
                    String senha = edit_senha.getText().toString();

                    if(cpf.isEmpty() || senha.isEmpty()){
                        Toast.makeText(getContext(), "Preencha todos os campos", Toast.LENGTH_LONG).show();

                    }else{

                        url =  getContext().getString(R.string.link)+"logar.php";

                        parametros = "cpf=" + cpf +"&senha=" + senha;

                        new Login.SolicitaDados().execute(url);

                    }
                }else{
                    Snackbar.make(v, "Sua internet já era. Traga ela de volta, a gente te espera!", Snackbar.LENGTH_INDEFINITE)
                            .setAction("Fechar", new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {
                                            Intent intent = new Intent(getContext(), MainActivity.class);
                                            startActivity(intent);
                                        }
                                    }
                            ).show();

                }

            }
        });
    }




    private class SolicitaDados extends AsyncTask<String, Void, String> {

        ProgressDialog progressDialog;
        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            progressDialog = ProgressDialog.show(getContext(), "Aguarde...", "Estamos Trabalhando");

        }

        @Override
        protected String doInBackground(String... urls){

            return Conexao.postDados(urls[0], parametros);

        }

        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String resultado){


            progressDialog.dismiss();

            if(resultado.contains("login_ok")){

                String[] dados = resultado.split(",");

                Intent abreInicio = new Intent(getContext(), HomeActivity.class);

                preferences.edit().putString("id_aluno", dados[1]).commit();
                preferences.edit().putString("email", dados[2]).commit();
                preferences.edit().putString("nome_curso", dados[3]).commit();
                preferences.edit().putString("matricula", dados[4]).commit();
                preferences.edit().putString("nome", dados[5]).commit();
                preferences.edit().putString("dt_nasc", dados[6]).commit();
                preferences.edit().putString("cpf", dados[7]).commit();
                preferences.edit().putString("id_turma", dados[8]).commit();
                preferences.edit().putString("nome_turma", dados[9]).commit();
                preferences.edit().putString("senha", dados[10]).commit();
                preferences.edit().putString("genero", dados[11]).commit();
                preferences.edit().putString("email_institucional", dados[12]).commit();
                preferences.edit().putString("foto", dados[13]).commit();

                startActivity(abreInicio);

            }else{

                Toast.makeText(getContext(), "Usuário ou senha incorretos", Toast.LENGTH_LONG).show();

            }

        }

        }
    }



