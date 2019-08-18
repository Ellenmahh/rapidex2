package br.com.bmnv.portalaluno.app;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

public class ViewSenha extends AppCompatActivity {

    TextView view_senha, view_nome,view_cpf;
    String viewSenha, viewNome,ViewCpf,ImgAluno;
    ImageView imgAluno;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_senha2);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        view_senha = (TextView)findViewById(R.id.view_senha);
        viewSenha = getIntent().getExtras().getString("senha");

        view_nome = (TextView)findViewById(R.id.view_nome);
        viewNome = getIntent().getExtras().getString("nome");
        view_cpf = (TextView)findViewById(R.id.view_cpf);
        ViewCpf = getIntent().getExtras().getString("cpf");
        imgAluno = (ImageView) findViewById(R.id.img_aluno);
        ImgAluno = getIntent().getExtras().getString("foto");


        view_senha.setText("Senha: "+viewSenha);
        view_nome.setText("Nome: "+ viewNome);
        view_cpf.setText("CPF: "+ ViewCpf);


        Picasso.with(this)
                .load(ImgAluno)
                .resize(500,475)
                .centerCrop()
                .transform(new CircleTransform())
                .into(imgAluno);



    }



}
