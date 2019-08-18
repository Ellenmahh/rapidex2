package br.com.bmnv.portalaluno.app;

/**
 * Created by 16165850 on 24/05/2017.
 */

public class NomesMaterias {

    private String id_materia;
    private String nome_materia;

    public String getId_materia() {
        return id_materia;
    }

    public void setId_materia(String id_materia) {
        this.id_materia = id_materia;
    }

    public String getNome_materia() {
        return nome_materia;
    }

    public void setNome_materia(String nome_materia) {
        this.nome_materia = nome_materia;
    }


    @Override
    public String toString() {
        return nome_materia;
    }
}
