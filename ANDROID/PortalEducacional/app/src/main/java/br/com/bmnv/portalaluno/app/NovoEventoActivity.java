package br.com.bmnv.portalaluno.app;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.DatePicker;
import android.widget.TextView;

import java.util.Calendar;

public class NovoEventoActivity extends AppCompatActivity {

    static TextView txt_data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_novo_evento);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        txt_data =(TextView) findViewById(R.id.txt_data);
    }


    public void abrirCalendario(View view) {

        //Abrir o calendario
        DialogFragment calendario = new DatePickerFragment();
        calendario.show(getSupportFragmentManager(), "datepicker");
    }


    public static class DatePickerFragment extends DialogFragment
            implements DatePickerDialog.OnDateSetListener
    {

        @NonNull
        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            final Calendar c = Calendar.getInstance();

            int ano = c.get(Calendar.YEAR);
            int mes = c.get(Calendar.MONTH);
            int dia = c.get(Calendar.DAY_OF_MONTH);

            //Cria uma nova instancia de calendario e retorna
            return new DatePickerDialog(getActivity(), this, ano, mes, dia);
        }

        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            //função chamada após a escolha da data

            String dataSelecionada = String.format("%02d/%02d/%d",
                    dayOfMonth, ++month , year );

            txt_data.setText(dataSelecionada);

        }
    }

}
