# minecraft-server-gcp

a minecraft server using Google Cloud Platform

for fun :)

## costs

### GCP

- $10 yearly for domains. Subdomains are free.
- Static VM IPs are very, very cheap. Pennies per day.
- Seems to be about $1.79 per day for `e2-custom-2-6144` (1 VM, 2 CPU, 6GB) with a modpack that's relatively old (2016). May be worth checking out DigitalOcean, CreeperHost, NodeCraft, etc.

## notes

You need java 7/8 for some packs.

See scripts and GitHub releases :)

### really old modpacks, i.e. java 7

you need to run it with Java 1.7 - download here:

https://github.com/HenryFBP/minecraft-server-gcp/releases/download/jdk-7-windows-64/jdk-7u80-windows-x64.exe

then, you need to edit the run options on your Minecraft instance to use Java 1.7

This may look different depending on what launcher you use.

My Java 7 is installed at `C:\Program Files\Java\jdk1.7.0_80`

![image](./img/oldasspack.png)

## inspiration

Inspired by:

https://www.reddit.com/r/googlecloud/comments/j3n7m4/minecraft_server_on_gcp_cost_135_last_month_what/

https://cloud.google.com/blog/products/it-ops/brick-by-brick-learn-gcp-by-setting-up-a-minecraft-server

https://cloud.google.com/solutions/gaming/minecraft-server

https://cloud.google.com/scheduler/docs/start-and-stop-compute-engine-instances-on-a-schedule

https://github.com/Arconapalus/GCP-example-solutions/blob/master/GCP_Scripts/start_stop_vm_script.md

https://hub.docker.com/r/jaysonsantos/minecraft-ftb-skyfactory3

https://www.docker.com/blog/deploying-a-minecraft-docker-server-to-the-cloud/
