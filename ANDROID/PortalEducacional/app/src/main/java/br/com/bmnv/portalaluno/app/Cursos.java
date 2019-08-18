package br.com.bmnv.portalaluno.app;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;


public class Cursos extends Fragment {

    ListView listCursos;
    List<Fics> listaFics = new ArrayList<>();
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.cursos, container, false);




        listCursos = (ListView) rootView.findViewById(R.id.list_view_fics);

        listaFics.add(new Fics("Assistente Administrativo","Aberto"));
        listaFics.add(new Fics("Assistente de Recursos Humanos","Aberto"));
        listaFics.add(new Fics("Ajustador Mecânico","Aberto"));
        listaFics.add(new Fics("Administrador de redes Linux","Aberto"));
        listaFics.add(new Fics("Auto CAD 3D","Aberto"));
        listaFics.add(new Fics("Informática Básica","Aberto"));
        listaFics.add(new Fics("Excel Avançado","Aberto"));
        listaFics.add(new Fics("Operador de Microcomputador","Aberto"));
        listaFics.add(new Fics("Auxiliar de Eletricista","Aberto"));
        listaFics.add(new Fics("Usinagem CNC","Aberto"));

        FicsAdapter adapter =  new FicsAdapter(
                getActivity(),
                R.layout.list_item_fics_customizado,
                listaFics);

        listCursos.setAdapter(adapter);


        return rootView;
    }

}
