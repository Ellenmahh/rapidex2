package br.com.gastometro.app;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

/**
 * Created by 15251365 on 04/10/2016.
 */
// ADAPTER  CUSTOMIZADO
public class LancamentoAdapter extends ArrayAdapter<Lancamentos>{
    int resource;
    //construtor da classe,parametros para usar esta classe
    public LancamentoAdapter (Context context, int resource, List<Lancamentos> lstLancamentos){
        super(context,resource,lstLancamentos);
        this.resource=resource;

    }
// sera colocado os objetos na tela atraves do getView
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // monta o layout
        View v = convertView;
        if(v==null){
            // mostar ao convertView em qual layout ele vai trabalhar, para montar as caixinhas
            LayoutInflater inflater = LayoutInflater.from(getContext());
            v= inflater.inflate(resource,null);
        }
        //pegar as informações da lista atraves da posição
        Lancamentos lancamento = getItem(position);

        //declarar os objetos que estao no list_view_item
        //usando o v = convertView
        ImageView img_list_item = (ImageView) v.findViewById(R.id.img_list_item);
        TextView txt_nome_item =(TextView) v.findViewById(R.id.txt_nome_item);
        TextView txt_categoria_item = (TextView) v.findViewById(R.id.txt_categoria_item);
        TextView txt_valor_item = (TextView) v.findViewById(R.id.txt_valor_item);

        //buscar categoria
       // Categoria cat = Categoria.buscarCategoria(getContext(),lancamento.getIdCategoria());



    // colocar na tela os valores de cada caixinha

        txt_nome_item.setText(lancamento.getNome());

        //setar categoria
        txt_categoria_item.setText(lancamento.getCategoria().getNome());

        //formação de R$ BRASIL
        Locale ptBr = new Locale ("pt", "BR");
        NumberFormat f = NumberFormat.getCurrencyInstance(ptBr);

        txt_valor_item.setText(f.format(lancamento.getValor()));



        // se o tipo retornar 1 despesa, exibir a imagem de -
        // se retornar 2 entrada, exibir a imagem +
        if(lancamento.getIdTipo() == 1) // despesa
        {
            img_list_item.setImageResource(R.drawable.ic_remove_circle_black_24dp);
        }else{
            img_list_item.setImageResource(R.drawable.ic_add_circle_black_24dp);
        }
        //retornar o layout montado
        return v;
    }
}
