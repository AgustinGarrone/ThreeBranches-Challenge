package com.example.backend.exceptions;

public class HasRelations extends Exception{

    public HasRelations() {
        super("No se puede eliminar, tiene datos relacionados.");
    }
}
