include "globals.mzn";
enum ACTORES;
array[ACTORES, int] of int: Escenas;
int: nEscenas=length(row(Escenas,1))-1;

array[1..nEscenas] of int: Duracion;
array[ACTORES] of int: Costo = [Escenas[x,nEscenas+1] | x in ACTORES];
array[ACTORES] of set of int: EscenaDe = [{y | y in 1..nEscenas where Escenas[x,y]=1} | x in ACTORES];
array[1..nEscenas] of var 1..nEscenas: PosicionDeEscena;



constraint all_different(PosicionDeEscena);

var int : costo = (sum(j in ACTORES)(
                       let {
                         var int: primera=min([PosicionDeEscena[e] | e in EscenaDe[j]]);
                         var int: ultima=max([PosicionDeEscena[e] | e in EscenaDe[j]]);
                       }
                       in
                      (sum(i in 1..nEscenas)
                          (if PosicionDeEscena[i] >= primera
                              /\
                              PosicionDeEscena[i] <= ultima
                           then Duracion[i]
                           else 0
                           endif)) * Costo[j]));




solve minimize costo;

output["p(\(p)):\(PosicionDeEscena[p]) " | p in 1..length(PosicionDeEscena)]++
      ["\n"]++["Costo: \(costo) \n"];
%output["Costo: \(costo) \n"];