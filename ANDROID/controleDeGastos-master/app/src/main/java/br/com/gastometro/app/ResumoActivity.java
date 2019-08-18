package br.com.gastometro.app;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ListViewCompat;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

public class ResumoActivity extends AppCompatActivity {
    TextView txt_entrada,txt_saida,txt_saldo;
    ListView list_view_resumo;
    Context context;
    ResumoAdapter adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_resumo);

        txt_entrada = (TextView) findViewById(R.id.txt_entrada);
        txt_saida = (TextView) findViewById(R.id.txt_saida);
        txt_saldo = (TextView) findViewById(R.id.txt_saldo);
        list_view_resumo = (ListView) findViewById(R.id.list_view_resumo);
        context = this;
        ListaResumo();
    }

    private void ListaResumo(){

        List<Lancamentos> lstLancamentos= Lancamentos.obterTodos(context);

        adapter =
                new ResumoAdapter(
                        context,
                        R.layout.list_view_resumo,
                        lstLancamentos
                );
        list_view_resumo.setAdapter(adapter);

        double entrada=0, saida=0;
        for (Lancamentos item : lstLancamentos){

            if(item.getIdTipo() ==1 ){
                //despesa
                saida += item.getValor();
            }else{
                entrada += item.getValor();
            }
        }

        double saldo = entrada - saida;

        Locale ptBr = new Locale("pt", "BR");
        NumberFormat f = NumberFormat.getCurrencyInstance(ptBr);

        txt_saldo.setText( f.format(saldo));
        txt_entrada.setText( f.format(entrada));
        txt_saida.setText( f.format(saida));
    }



}
