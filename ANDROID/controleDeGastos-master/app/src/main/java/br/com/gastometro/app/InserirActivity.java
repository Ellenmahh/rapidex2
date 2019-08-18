package br.com.gastometro.app;

import android.content.ContentValues;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

public class InserirActivity extends AppCompatActivity {

    Spinner spn_tipo_lancamento, spn_categoria;
    EditText txt_nome;
    EditText txt_valor;
    static EditText txt_data;
    Button btn_inserir;

    ArrayAdapter<TipoLancamento> tipoLancamentoAdapter;
    ArrayAdapter<Categoria> categoriaAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inserir);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        spn_tipo_lancamento = (Spinner) findViewById(R.id.spn_tipo_lancamento);
        spn_categoria = (Spinner) findViewById(R.id.spn_categoria);
        txt_nome = (EditText) findViewById(R.id.txt_nome);
        txt_valor = (EditText) findViewById(R.id.txt_valor);
        txt_data = (EditText) findViewById(R.id.txt_data);
        btn_inserir = (Button) findViewById(R.id.btn_inserir);

        txt_data.setOnFocusChangeListener(new View.OnFocusChangeListener() {

            @Override
            public void onFocusChange(View view, boolean hasFocus) {
                if (hasFocus) {
                    DialogFragment newFragment =
                            new DatePickerFragment().setTxt_data(txt_data);
                    newFragment.show(getSupportFragmentManager(), "datePicker");
                }
            }
        });


        txt_data.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DialogFragment newFragment =
                        new DatePickerFragment().setTxt_data(txt_data);
                newFragment.show(getSupportFragmentManager(), "datePicker");
            }
        });


        btn_inserir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                inserirDados(v);
            }
        });

        preencherSpinners();
    }

    public void inserirDados(View view) {

        if (!validacao()) return;
        //banco de dados de escrita porque quero fazer um insert
        SQLiteDatabase db = new DatabaseHelper(this).getWritableDatabase();

        ContentValues valores = new ContentValues();
        valores.put("nome", txt_nome.getText().toString());
        valores.put("valor", txt_valor.getText().toString());
        valores.put("data", txt_data.getText().toString());


        //
        TipoLancamento tipo = (TipoLancamento) spn_tipo_lancamento.getSelectedItem();
        valores.put("idTipo", tipo.getId());

        //
        Categoria categoria = (Categoria) spn_categoria.getSelectedItem();
        valores.put("idCategoria", categoria.getId());

        //retorna -1 se deu algum erro
        long resultado = db.insert("lancamentos", null, valores);

        if (resultado != -1) {
            Toast.makeText(this, "Inserido com sucesso", Toast.LENGTH_SHORT).show();

            Intent context;
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);


        } else {
            Toast.makeText(this, "Erro ao inserir", Toast.LENGTH_SHORT).show();
        }


    }


    private boolean validacao() {

        txt_nome.setError(null);
        txt_valor.setError(null);
        txt_data.setError(null);

        if (txt_nome.getText().toString().isEmpty()) {
            txt_nome.setError("Preencha este campo!");
            return false;
        }
        if (txt_valor.getText().toString().isEmpty()) {
            txt_valor.setError("Preencha este campo!");
            return false;
        }
        if (txt_data.getText().toString().isEmpty()) {
            txt_data.setError("Preencha este campo!");
            return false;
        }
        return true;
    }


    private void preencherSpinners() {

        TipoLancamento.preencherSpinnerTipo(this, spn_tipo_lancamento,tipoLancamentoAdapter );

        //Preencher spinner de categorias
        Categoria.preencherSpinnerCategoria(this, spn_categoria, categoriaAdapter);

    }

}