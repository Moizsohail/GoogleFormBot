# %%
import tkinter as tk
from components import *
import yaml
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

# %%
data = yaml.load(open('form.yml').read(), yaml.FullLoader)
master = tk.Tk()

tk.Label(master, text="Q1. "+data[0].q).grid(row=0, columnspan=2)
# %%
fig = Figure()
ax = fig.add_subplot(111)
pie, _ = ax.pie([1]*len(data[0].options))

canvas = FigureCanvasTkAgg(fig, master=master)

canvas.get_tk_widget().grid(row=1, column=0, columnspan=2)
canvas.draw()
# %%

svs = []


def callback(n):
    index = int(n.replace("PY_VAR", ""))
    try:
        r = int(svs[index].get())
    except:
        pass

    pie, _ = ax.pie(svs_to_pie(svs))
    canvas.draw()


def svs_to_pie(svs):
    f = []
    for x in svs:
        r = 0
        try:
            r = int(x.get())
        except:
            pass
        f += [r]
    return f


rows = 0
for i, x in enumerate(data[0].options):
    rows = i+2
    tk.Label(master, text=x + " ( % )").grid(row=i+2, pady=2)
    sv = tk.StringVar()
    svs += [sv]
    sv.trace_add("write", lambda n, i, m: callback(n))
    tk.Entry(master, textvariable=svs[i]).grid(row=i+2, column=1, padx=1)

tk.Button(master, text="Previous").grid(row=rows+1, column=0)
tk.Button(master, text="Next").grid(row=rows+1, column=1)
# tk.Label(master, text="Last Name").grid(row=1)

# e1 = tk.Entry(master)
# e2 = tk.Entry(master)

# e1.grid(row=0, column=1)
# e2.grid(row=1, column=1)
# for (text, value) in values.items():
# Radiobutton(master, text=text, variable=v,
# value=value).pack(side=TOP, ipady=5)


# Code to add widgets will go here...
master.mainloop()

# %%
