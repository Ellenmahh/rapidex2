package br.com.bmnv.portalaluno.app;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class AgendaActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_agenda);

    }

    public void abrirEventos(View view) {
        Intent intent = new Intent(AgendaActivity.this, EventosActivity.class );
        startActivity(intent);
    }

    public void abrirTrabalhos(View view) {
        Intent intent = new Intent(AgendaActivity.this, TrabalhosActivity.class );
        startActivity(intent);
    }

    public void abrirProvas(View view) {
        Intent intent = new Intent(AgendaActivity.this, ProvasActivity.class );
        startActivity(intent);
    }
}
