package br.com.bmnv.portalaluno.app;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by 16165872 on 31/05/2017.
 */

public class AnotacoesAdapter extends ArrayAdapter<Anotacao> {

    int resource;
    public AnotacoesAdapter(Context context, int resource, List<Anotacao> objects) {
        super(context, resource, objects);
        this.resource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, View convertView, ViewGroup parent){
        View v = convertView;

        if(v == null){
            v = LayoutInflater.from(getContext())
                    .inflate(resource, null);
        }

        Anotacao anotacao = getItem(position);

        if(anotacao != null){
            TextView titulo = (TextView) v.findViewById(R.id.text_titulo_customizado);
            TextView textoAnotacao = (TextView) v.findViewById(R.id.text_descricao_customizado);

            titulo.setText(anotacao.getTitulo());
            textoAnotacao.setText(anotacao.getAnotacao());


        }

        return  v;
    }
}
