"use strict";

let touchStartX = 0;

const iconPaths = {
  terminal: '<path d="m4 17 5-5-5-5"/><path d="M12 19h8"/>',
  folder: '<path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  shield: '<path d="M12 3 20 7v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V7l8-4Z"/><path d="m9 12 2 2 4-5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  route: '<path d="M6 3v6"/><path d="M18 15v6"/><path d="M6 9a6 6 0 0 0 6 6h6"/><circle cx="6" cy="3" r="2"/><circle cx="18" cy="21" r="2"/>',
  box: '<path d="m21 16-9 5-9-5V8l9-5 9 5Z"/><path d="m3.3 7.6 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  power: '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
  network: '<path d="M12 4v5"/><path d="M6 20v-5h12v5"/><path d="M4 9h16v6H4z"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  drive: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h8"/><circle cx="9" cy="17" r="1"/><circle cx="15" cy="17" r="1"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/>',
  notebook: '<path d="M6 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 8h7"/><path d="M8 12h7"/><path d="M8 16h5"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3"/><path d="M7.5 16h9"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  exam: '<path d="M8 4h10v16H6V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  cards: '<rect x="4" y="7" width="13" height="14" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v12"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><path d="M12 7h.01"/>'
};

const topics = [
  {
    id: "exam",
    title: "Final Exam Map",
    icon: "exam",
    lessons: [
      {
        title: "What The Final Rewards",
        body: [
          "Your Linux final rewards direct command recognition. Read the scenario, identify the exact job, then choose the command, option, file, or permission bit that matches it.",
          "The study guide emphasizes command anatomy, filesystem locations, permissions, links, users and groups, sudo, vim, man pages, redirection, variables, and practical tasks.",
          "The Red Hat chapters add DNF software management, file systems, systemd unit files, networking with NetworkManager, and secure network services."
        ],
        remember: "Question job + exact Linux tool = answer. Do not overthink simple command-recognition questions."
      },
      {
        title: "High Value Command Patterns",
        body: [
          "For paths and files, watch for pwd, cd, ls, cp, mv, mkdir -p, touch, rm, df, du, and dd.",
          "For accounts, root UID is 0, /etc/passwd stores account fields, /etc/shadow stores password hashes, /etc/group stores groups, and /etc/sudoers stores sudo policy.",
          "For admin tasks, usermod -aG appends groups, visudo safely edits sudoers, chmod controls permissions, and systemctl controls services."
        ],
        commands: ["mkdir -p CSN/lasvegas", "sudo usermod -aG Admin jdoe", "%Admin ALL=(ALL) ALL", "!! 2> errors.log"],
        remember: "-aG appends. -G without -a replaces. That is a classic trap."
      },
      {
        title: "Practical Walkthrough",
        body: [
          "Create a user with useradd, then set the password with passwd. Create an Admin group with a custom GID by using groupadd -g.",
          "Verify a user without echo, an editor, or getent by grepping /etc/passwd and redirecting the result to a file.",
          "Use sudo -u user command to run one command as another user without fully switching users. Use touch with brace expansion to create many numbered files."
        ],
        commands: ["sudo useradd linuxadmin", "sudo passwd linuxadmin", "grep linuxadmin /etc/passwd > ~/cit173", "touch ~/MYWORK/bob{1..10}.txt"],
        remember: "The practical questions are small recipes. Memorize the command shape, not just the concept."
      }
    ]
  },
  {
    id: "basics",
    title: "Linux Basics",
    icon: "terminal",
    lessons: [
      {
        title: "Shell, Terminal, Prompt",
        body: [
          "Linux is modular. It can be a full graphical desktop, a server, or a small appliance.",
          "The shell interprets and executes commands typed at the command line. The terminal is the program that hosts the shell.",
          "In a prompt, $ usually indicates a regular user and # usually indicates root."
        ],
        remember: "Shell executes commands. Terminal hosts the shell."
      },
      {
        title: "Command Anatomy",
        body: [
          "In ls -la /home, ls is the command, -la is the option, and /home is the argument.",
          "Use a backslash at the end of a line to continue a long command on the next line.",
          "Tab autocompletes. Pressing Tab twice lists possible completions."
        ],
        commands: ["ls -la /home", "echo this is a long command \\", "cd /ho<Tab>"],
        remember: "Command + option + argument. The prompt is not part of the command."
      },
      {
        title: "Persistence And Help",
        body: [
          "A file that survives a reboot is persistent. Runtime data may disappear when a process or system restarts.",
          "The man command opens manual pages. Man pages have nine sections.",
          "Common man page order is NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES, then SEE ALSO."
        ],
        commands: ["man ls", "man -k password", "man 5 passwd"],
        remember: "If the answer choices include Examples, Description, Synopsis, and Options, Synopsis comes first."
      }
    ]
  },
  {
    id: "filesystem",
    title: "Files And Paths",
    icon: "folder",
    lessons: [
      {
        title: "Filesystem Hierarchy",
        body: [
          "/ is the root of the filesystem. /root is the root user's home directory.",
          "/home contains home directories for regular users. A RHEL user named linuxadmin normally has /home/linuxadmin.",
          "/etc holds most system configuration files, /usr holds programs, libraries, and documentation, and /var holds changing data such as logs and spools."
        ],
        remember: "/home is for regular users. /root is root's home. /etc is configuration."
      },
      {
        title: "Navigation And Listing",
        body: [
          "pwd prints the absolute path of the current working directory.",
          "cd .. moves up one directory, cd ~ goes home, and cd - returns to the previous directory.",
          "ls -l is long listing, ls -a shows hidden files, ls -la combines long plus all, and ls -R lists recursively."
        ],
        commands: ["pwd", "cd ..", "cd ~", "ls -la", "ls -R /etc"],
        remember: "For all files in long listing, choose -la or -al."
      },
      {
        title: "File Manipulation",
        body: [
          "cp copies. Helpful options include -i to prompt before overwrite, -r for recursive copies, -p to preserve attributes, and -f to force.",
          "mv moves and renames. mkdir -p creates parent and child directories in one command.",
          "touch creates an empty file or updates timestamps. rm removes files; use rm -r for directories. df shows disk free space."
        ],
        commands: ["cp -i old.txt new.txt", "mv draft.txt final.txt", "mkdir -p projects/webapp/src", "df -h"],
        remember: "mkdir /a/b/c fails if parents do not exist. mkdir -p /a/b/c creates the full path."
      }
    ]
  },
  {
    id: "permissions",
    title: "Permissions Links",
    icon: "shield",
    lessons: [
      {
        title: "Reading Permission Strings",
        body: [
          "A permission string has ten characters: file type, then owner permissions, group permissions, and other permissions.",
          "The first character is - for a regular file, d for a directory, and l for a symbolic link.",
          "In rwxrwxr-x, the third triplet r-x applies to other, meaning everyone besides the user owner and group owner."
        ],
        remember: "Owner, group, other. The third triplet is other."
      },
      {
        title: "chmod And Special Bits",
        body: [
          "Symbolic chmod uses u, g, o, or a with +, -, or = and r, w, or x. chmod u+r file gives the user owner read access.",
          "Octal permissions use r=4, w=2, x=1. 755 means rwxr-xr-x.",
          "Special leading octal digits are 4 for SUID, 2 for SGID, and 1 for sticky bit. chmod 2775 adds SGID; chmod 1777 adds sticky."
        ],
        commands: ["chmod u+r report.txt", "chmod 755 script.sh", "chmod 2775 shared", "chmod +t /tmp/project"],
        remember: "SUID=4, SGID=2, sticky=1."
      },
      {
        title: "Hard And Symbolic Links",
        body: [
          "A hard link points to the same inode and increases the link count by one.",
          "A symbolic link is a small file that points to another file by name or path.",
          "If the original is deleted, a hard link can still access the data. A symbolic link breaks if its target path disappears."
        ],
        commands: ["ln source.txt hardlink.txt", "ln -s source.txt softlink.txt", "ls -li"],
        remember: "Points by name means symbolic link. Same inode means hard link."
      }
    ]
  },
  {
    id: "users",
    title: "Users Groups Sudo",
    icon: "users",
    lessons: [
      {
        title: "Important Account Files",
        body: [
          "/etc/passwd has account records in the format name:x:UID:GID:GECOS:home:shell. The third field is UID and the last field is login shell.",
          "/etc/shadow stores encrypted passwords. /etc/group stores group membership. /etc/sudoers stores sudo rules.",
          "Root has UID 0. A GID is typically a plain integer such as 83 or 87589."
        ],
        remember: "/etc/passwd last field = login shell. Third field = UID."
      },
      {
        title: "User And Group Commands",
        body: [
          "useradd creates a user, passwd changes a password, and userdel -r removes a user plus the home directory.",
          "groupadd creates a group. groupadd -g GID name creates a group with a custom GID.",
          "groups user and id user show group membership. Only root can change a file's group ownership."
        ],
        commands: ["sudo useradd bianca", "sudo passwd bianca", "sudo groupadd -g 1987777 Admin", "id bianca"],
        remember: "passwd changes passwords, not chmod, sudo, or uid."
      },
      {
        title: "Sudo And Supplementary Groups",
        body: [
          "usermod -aG group user appends the user to supplementary groups. usermod -G without -a replaces the list.",
          "Use visudo to safely edit /etc/sudoers. A group rule begins with percent sign.",
          "su - user switches to a login shell as another user. sudo -u user command runs one command as that user without switching."
        ],
        commands: ["sudo usermod -aG Admin jdoe", "sudo visudo", "%Admin ALL=(ALL) ALL", "sudo -u newuser touch ~newuser/file.txt"],
        remember: "Append with -aG. Grant Admin group sudo with %Admin ALL=(ALL) ALL."
      }
    ]
  },
  {
    id: "vimman",
    title: "Vim And Man",
    icon: "edit",
    lessons: [
      {
        title: "Vim Modes",
        body: [
          "Vim modes include command mode, insert mode, and visual mode. Exit is not a Vim mode.",
          "Press i to enter insert mode. Press Esc to return to command mode.",
          "Use :w to save, :q to quit, :wq to save and quit, and :q! to quit without saving."
        ],
        commands: ["i", "Esc", ":w", ":q", ":wq", ":q!"],
        remember: "If the choices are visual, command, exit, insert, the answer for NOT a mode is exit."
      },
      {
        title: "Vim Editing Moves",
        body: [
          "dd deletes the current line. yy yanks, or copies, the current line. p pastes.",
          "/text searches forward for text.",
          ":%s/old/new/g replaces old with new across the file."
        ],
        commands: ["dd", "yy", "p", "/error", ":%s/old/new/g"],
        remember: "dd delete line, yy yank line, p paste."
      },
      {
        title: "Manual Page Sections",
        body: [
          "Section 1 contains user commands, section 5 contains file formats, and section 8 contains system administration commands.",
          "Use man -k keyword to search manual page names and descriptions.",
          "Use man N command when you need a specific section."
        ],
        commands: ["man passwd", "man 5 passwd", "man -k network"],
        remember: "Nine man sections. Synopsis appears before Description, Options, and Examples."
      }
    ]
  },
  {
    id: "shell",
    title: "Redirection Shell",
    icon: "route",
    lessons: [
      {
        title: "File Descriptors",
        body: [
          "Standard input is file descriptor 0. Standard output is file descriptor 1. Standard error is file descriptor 2.",
          "> redirects stdout and overwrites the file. >> redirects stdout and appends to the file.",
          "2> redirects stderr. 2>> appends stderr."
        ],
        commands: ["command > out.txt", "command >> out.txt", "command 2> errors.log"],
        remember: "stdin=0, stdout=1, stderr=2."
      },
      {
        title: "Pipes And Combined Output",
        body: [
          "A pipe connects stdout of one command to stdin of the next command.",
          "2>&1 merges stderr into stdout. &> file redirects both stdout and stderr to one file.",
          "&>/dev/null discards both streams. tee splits output to the screen and a file."
        ],
        commands: ["grep root /etc/passwd | tee roots.txt", "command &> all.log", "command &>/dev/null", "!! 2> errors.log"],
        remember: "For redirecting file descriptors 1 and 2 to a file, choose &> file."
      },
      {
        title: "Variables And Expansion",
        body: [
          "Set a shell variable with VAR=value. Do not put spaces around the equals sign.",
          "Use echo $VAR to print the variable. export VAR promotes it to an environment variable inherited by child processes.",
          "Brace expansion can create repeated names, such as bob1.txt through bob10.txt."
        ],
        commands: ["FAKE='thepassword'", "echo $FAKE > file.txt", "export FAKE", "touch bob{1..10}.txt"],
        remember: "Plain assignment is local to the current shell. export makes it inheritable."
      }
    ]
  },
  {
    id: "dnf",
    title: "DNF Packages",
    icon: "box",
    lessons: [
      {
        title: "Repositories And Packages",
        body: [
          "DNF manages software from RPM repositories. Repositories provide packages and metadata.",
          "Use dnf search to find packages, dnf list to list packages, and dnf info to display package information.",
          "Repository configuration files commonly live under /etc/yum.repos.d/."
        ],
        commands: ["dnf search httpd", "dnf list installed", "dnf info bash", "dnf repolist"],
        remember: "DNF is the RHEL package management tool for RPM repositories."
      },
      {
        title: "Install, Update, Remove",
        body: [
          "dnf install installs packages. dnf update checks and applies available updates.",
          "dnf remove removes installed packages. DNF records transactions in history.",
          "dnf group list and dnf group install work with package groups."
        ],
        commands: ["sudo dnf install vim", "sudo dnf update", "sudo dnf remove nano", "dnf history"],
        remember: "Install, update, remove, history: the core DNF rhythm."
      },
      {
        title: "Automation And Security Updates",
        body: [
          "The dnf-automatic package can automate software updates.",
          "DNF automatic uses systemd timer units to run update jobs on a schedule.",
          "Security-related updates can be handled separately when the system is configured to use security metadata."
        ],
        commands: ["sudo dnf install dnf-automatic", "systemctl list-timers", "sudo systemctl enable --now dnf-automatic.timer"],
        remember: "DNF automation is tied to systemd timers."
      }
    ]
  },
  {
    id: "systemd",
    title: "systemd Services",
    icon: "power",
    lessons: [
      {
        title: "Unit Files",
        body: [
          "systemd uses unit files to describe services, targets, timers, sockets, and other system objects.",
          "Unit files commonly have [Unit], [Service], and [Install] sections.",
          "Default unit files are usually under /usr/lib/systemd/system, while administrator overrides and custom units are under /etc/systemd/system."
        ],
        commands: ["systemctl cat sshd.service", "systemctl list-unit-files", "sudo systemctl daemon-reload"],
        remember: "/etc/systemd/system is for admin customizations and overrides."
      },
      {
        title: "Managing Services",
        body: [
          "systemctl status displays service status. start and stop control the current running state.",
          "restart stops and starts a service. reload asks the service to reload configuration without a full restart when supported.",
          "enable makes a service start at boot. disable prevents boot start."
        ],
        commands: ["systemctl status sshd", "sudo systemctl start sshd", "sudo systemctl restart sshd", "sudo systemctl enable --now sshd"],
        remember: "start now, enable at boot, enable --now does both."
      },
      {
        title: "Targets And Boot",
        body: [
          "Targets group units into a system state. Graphical and multi-user targets are common boot states.",
          "systemctl get-default shows the default target. set-default changes the target used at boot.",
          "systemd-analyze helps examine boot performance."
        ],
        commands: ["systemctl get-default", "sudo systemctl set-default multi-user.target", "systemd-analyze blame"],
        remember: "Targets are system states; services are long-running daemons."
      }
    ]
  },
  {
    id: "networking",
    title: "Networking",
    icon: "network",
    lessons: [
      {
        title: "NetworkManager Tools",
        body: [
          "NetworkManager manages network connections on RHEL. nmcli is the command-line tool and nmtui is the text user interface.",
          "A connection profile stores network settings. A device is the actual network interface.",
          "Use nmcli connection show to list profiles and nmcli device status to inspect devices."
        ],
        commands: ["nmcli connection show", "nmcli device status", "nmtui"],
        remember: "Profile is configuration. Device is hardware or virtual interface."
      },
      {
        title: "Static And Dynamic IP",
        body: [
          "DHCP assigns dynamic address settings. Static addressing sets IP address, prefix, gateway, and DNS manually.",
          "nmcli can modify IPv4 method, addresses, gateway, and DNS values in a connection profile.",
          "After changes, reconnect the profile or bring it up so the settings apply."
        ],
        commands: ["nmcli con mod lab ipv4.method manual ipv4.addresses 192.0.2.10/24", "nmcli con mod lab ipv4.gateway 192.0.2.1", "nmcli con up lab"],
        remember: "Static IP means manual method plus address, prefix, gateway, and DNS."
      },
      {
        title: "Bonds, VLANs, Bridges",
        body: [
          "A bond combines interfaces for redundancy or throughput, depending on the bonding mode.",
          "A VLAN adds a tag so one physical network can carry multiple logical networks.",
          "A bridge connects network segments and is common for virtualization."
        ],
        commands: ["nmcli con add type bond ifname bond0", "nmcli con add type vlan ifname vlan10 dev enp1s0 id 10", "nmcli con add type bridge ifname br0"],
        remember: "Bond = combine links. VLAN = tag traffic. Bridge = connect segments."
      }
    ]
  },
  {
    id: "security",
    title: "Network Security",
    icon: "lock",
    lessons: [
      {
        title: "OpenSSH",
        body: [
          "OpenSSH provides encrypted remote login and file transfer. ssh connects to a server and sshd is the server daemon.",
          "Key-based authentication uses a private key on the client and a public key installed for the account on the server.",
          "Hardening can include disabling password authentication, limiting allowed users, and using strong key types."
        ],
        commands: ["ssh user@server", "ssh-keygen", "ssh-copy-id user@server", "sudo systemctl status sshd"],
        remember: "ssh is the client. sshd is the server service."
      },
      {
        title: "TLS And Trust",
        body: [
          "TLS protects network communication with certificates and cryptographic keys.",
          "A certificate authority signs certificates so clients can verify server identity.",
          "The system-wide trust store controls which CA certificates the system trusts."
        ],
        commands: ["openssl req -new -key server.key -out server.csr", "trust list", "update-ca-trust"],
        remember: "TLS proves identity and encrypts traffic."
      },
      {
        title: "Firewalls And VPNs",
        body: [
          "A host firewall controls allowed network services and ports.",
          "IPsec VPNs protect traffic between hosts or sites. Libreswan is a common IPsec implementation on RHEL.",
          "When a service listens on the network, check the service, firewall rules, address, route, and logs."
        ],
        commands: ["firewall-cmd --list-all", "firewall-cmd --add-service=ssh --permanent", "firewall-cmd --reload", "ss -tulpen"],
        remember: "For remote access problems, check both sshd and the firewall."
      }
    ]
  },
  {
    id: "storage",
    title: "Storage Mounts",
    icon: "drive",
    lessons: [
      {
        title: "Mount Points And fstab",
        body: [
          "Linux attaches file systems to directories called mount points. While a file system is mounted on a directory, the directory shows the mounted file system's contents.",
          "The mount command can attach a device, label, or UUID to a mount point. If required details are missing, mount checks /etc/fstab for saved entries.",
          "Persistent mounts belong in /etc/fstab. UUIDs and labels are safer than raw /dev/sdX names because device names can change between boots."
        ],
        commands: ["findmnt", "mount /dev/sdb1 /mnt/data", "blkid", "UUID=<uuid> /data xfs defaults 0 0"],
        remember: "Temporary mount: mount command. Persistent mount: /etc/fstab."
      },
      {
        title: "XFS, ext4, NFS, SMB",
        body: [
          "RHEL supports local file systems such as XFS and ext4, plus network file systems such as NFS and SMB.",
          "XFS is the default RHEL file system and is designed for scalability. ext4 is a widely used legacy Linux file system.",
          "NFS and SMB provide file access over the network. Use them when storage is shared from another server instead of attached locally."
        ],
        commands: ["mkfs.xfs /dev/vdb1", "mkfs.ext4 /dev/vdb1", "mount -t nfs server:/share /mnt/share", "mount -t cifs //server/share /mnt/share"],
        remember: "Local disk: XFS/ext4. Network share: NFS/SMB."
      },
      {
        title: "LVM Building Blocks",
        body: [
          "Logical Volume Manager adds an abstraction layer over physical storage so storage can be created, resized, renamed, and removed more flexibly.",
          "The main pieces are physical volumes, volume groups, and logical volumes. A physical volume is a disk or partition prepared for LVM, a volume group pools PV space, and a logical volume is the usable block device.",
          "Common command flow is pvcreate, vgcreate, lvcreate, then create a file system and mount it."
        ],
        commands: ["pvcreate /dev/sdb", "vgcreate vg_lab /dev/sdb", "lvcreate -n lv_data -L 10G vg_lab", "mkfs.xfs /dev/vg_lab/lv_data"],
        remember: "PV feeds VG; VG allocates LV; LV gets the file system."
      }
    ]
  },
  {
    id: "processmedia",
    title: "Processes Media Files",
    icon: "activity",
    lessons: [
      {
        title: "File Type And Viewing",
        body: [
          "Linux does not require filename extensions to decide file type. The file command examines file contents and metadata to report the type.",
          "cat prints file contents and can concatenate multiple files. Use it for short files, quick checks, or redirecting content.",
          "less is better for long files because you can scroll and search. head shows the beginning of a file and tail shows the end; tail -f follows a growing log file."
        ],
        commands: ["file /etc/passwd", "cat /etc/passwd", "less /var/log/messages", "head -n 20 file.txt", "tail -f /var/log/messages"],
        remember: "file identifies type. cat dumps contents. less browses. head starts. tail ends or follows."
      },
      {
        title: "Processes And States",
        body: [
          "A process is a running instance of a program. ps shows process snapshots, top gives a live process view, and pgrep finds process IDs by name.",
          "Common process states include R for running, S for sleeping, T for stopped, and Z for zombie. A zombie has exited but still has an entry until its parent collects its status.",
          "Every process has a PID. A parent process has a PPID. Many tools let you filter or act on processes by PID, command name, user, or terminal."
        ],
        commands: ["ps aux", "ps -ef", "top", "pgrep sshd", "pstree"],
        remember: "ps is a snapshot. top is live. PID identifies one process."
      },
      {
        title: "Signals And Priority",
        body: [
          "kill sends a signal to a process by PID. The default signal is TERM, which asks a process to stop cleanly.",
          "kill -9 sends KILL, which forces termination and cannot be caught or ignored. Use it when a normal TERM does not work.",
          "nice starts a process with an adjusted priority. renice changes priority for an existing process. Lower nice values mean higher scheduling priority; regular users can usually only increase nice values."
        ],
        commands: ["kill 1234", "kill -TERM 1234", "kill -9 1234", "nice -n 10 command", "renice 5 -p 1234"],
        remember: "TERM asks. KILL forces. nice starts with priority. renice changes an existing process."
      },
      {
        title: "Removable Media And Devices",
        body: [
          "lsblk lists block devices in a tree, which helps identify disks, partitions, and removable media. blkid shows filesystem UUIDs and labels.",
          "A device must have a filesystem mounted on a directory before you browse its files. mount attaches it and umount detaches it.",
          "If a removable device is not obvious, check lsblk, blkid, dmesg, or journalctl for detection messages. Always unmount before removing media to avoid data loss."
        ],
        commands: ["lsblk", "blkid", "mount /dev/sdb1 /mnt/usb", "umount /mnt/usb", "dmesg | tail"],
        remember: "Detect with lsblk/blkid. Attach with mount. Detach safely with umount."
      }
    ]
  },
  {
    id: "selinux",
    title: "SELinux Firewalld",
    icon: "shield",
    lessons: [
      {
        title: "SELinux Modes",
        body: [
          "SELinux can be enabled or disabled. When enabled, it runs in enforcing or permissive mode.",
          "Enforcing mode applies policy and denies actions that violate it. Permissive mode logs what would be denied but does not block it, which helps troubleshooting.",
          "setenforce changes enforcing/permissive mode only until reboot. Permanent mode changes are made in SELinux configuration or kernel parameters."
        ],
        commands: ["getenforce", "sestatus", "setenforce 0", "setenforce 1"],
        remember: "getenforce reports mode. setenforce is temporary."
      },
      {
        title: "Labels And Troubleshooting",
        body: [
          "SELinux decisions depend on labels, also called contexts. A file with the wrong context can be denied even when normal Unix permissions look correct.",
          "Use restorecon to restore default file contexts. Use semanage fcontext when you need to define a persistent custom context rule.",
          "When a network service fails only under SELinux, check audit logs and contexts before disabling protection."
        ],
        commands: ["ls -Z /var/www/html", "restorecon -Rv /var/www/html", "semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'"],
        remember: "Unix permissions answer who. SELinux labels answer what type of access policy allows."
      },
      {
        title: "Firewalld Runtime And Permanent",
        body: [
          "firewalld uses zones to apply different trust levels and rule sets to interfaces or sources.",
          "Runtime firewall changes take effect immediately but do not survive reload or restart unless saved. Permanent changes survive but need reload to apply.",
          "Predefined services open the ports required for a service, so you can allow ssh or http without memorizing every port."
        ],
        commands: ["firewall-cmd --get-active-zones", "firewall-cmd --list-all", "firewall-cmd --add-service=ssh", "firewall-cmd --runtime-to-permanent"],
        remember: "Runtime is now. Permanent is after reload/restart. Use --runtime-to-permanent to save current runtime rules."
      }
    ]
  }
];

const spanishPack = {
  ui: {
    "Work It Out: Linux": "Work It Out: Linux",
    "English Label": "English",
    "Spanish Label": "Spanish",
    "Lessons": "Lecciones",
    "Best Final": "Mejor final",
    "Saved Cards": "Tarjetas guardadas",
    "Cram Mode": "Modo repaso",
    "My Misses": "Mis falladas",
    "Command Lab": "Laboratorio",
    "Exam Goal": "Meta del examen",
    "Legal Note": "Nota legal",
    "Use it when": "Usalo cuando",
    "Home": "Inicio",
    "Set your exam date": "Pon la fecha del examen",
    "Exam date": "Fecha del examen",
    "days left": "dias restantes",
    "Today": "Hoy",
    "Today's goal": "Meta de hoy",
    "10 flashcards + 1 topic quiz + review misses": "10 tarjetas + 1 quiz de tema + repasar falladas",
    "No date set yet.": "Todavia no hay fecha.",
    "Clear": "Borrar",
    "High-yield command traps": "Trampas de comandos importantes",
    "Reveal": "Mostrar",
    "Hide": "Ocultar",
    "No misses yet": "Todavia no hay falladas",
    "Missed questions will collect here after quizzes.": "Las preguntas falladas se guardaran aqui despues de los quizzes.",
    "Start Notebook": "Abrir cuaderno",
    "Practice the exact command shape. Read the task, reveal the command, then move to the next prompt.": "Practica la forma exacta del comando. Lee la tarea, muestra el comando y sigue al proximo prompt.",
    "Source Notes": "Notas de fuentes",
    "Remember": "Recuerda",
    "Your Linux Final folder": "Tu carpeta Linux Final",
    "Primary Red Hat documentation": "Documentacion primaria de Red Hat",
    "GNU and Linux man pages": "GNU y paginas man de Linux",
    "Trademark note": "Nota de marcas",
    "Linux is a registered trademark of Linus Torvalds in the U.S. and other countries. This app is not affiliated with or endorsed by Linus Torvalds or The Linux Foundation.": "Linux es una marca registrada de Linus Torvalds en EE. UU. y otros paises. Esta app no esta afiliada ni respaldada por Linus Torvalds ni The Linux Foundation.",
    "Study guide and class materials used as the exam-specific spine.": "Guia de estudio y materiales de clase usados como base especifica del examen.",
    "Used for RHEL DNF, systemd, networking, storage, SELinux, firewalld, and OpenSSH behavior.": "Usada para RHEL DNF, systemd, redes, storage, SELinux, firewalld y OpenSSH.",
    "Used for command behavior, manual sections, file descriptors, permissions, and account file facts.": "Usadas para comportamiento de comandos, secciones man, descriptores, permisos y archivos de cuentas.",
    "Readiness": "Preparacion",
    "of": "de",
    "Bookmarked": "Guardado",
    "Looking polished": "Vas muy bien",
    "Getting close": "Ya casi",
    "Build the base": "Construye la base",
    "lessons marked done. Final practice pulls from every topic.": "lecciones marcadas. La practica final mezcla todos los temas.",
    "Drill": "Practicar",
    "Weak Spots": "Puntos debiles",
    "Take a few quizzes and this panel will show where to focus.": "Haz algunos cuestionarios y aqui aparecera donde enfocarte.",
    "Flash Cards": "Tarjetas",
    "Final Practice": "Practica final",
    "Cards": "Tarjetas",
    "Topic Quiz": "Quiz del tema",
    "Final strategy": "Estrategia final",
    "Lesson": "Leccion",
    "Done": "Listo",
    "Quiz Me": "Hazme quiz",
    "Next": "Siguiente",
    "Work it Out Final": "Final Resuelvelo",
    "Daily Quick Drill": "Practica diaria",
    "Missed Questions": "Preguntas falladas",
    "Quiz Results": "Resultados",
    "Score": "Puntaje",
    "correct out of": "correctas de",
    "That is solid exam energy.": "Eso se ve fuerte para el examen.",
    "Review the missed questions, then run another drill.": "Repasa las falladas y vuelve a practicar.",
    "Review Missed": "Repasar falladas",
    "Try Again": "Intentar otra vez",
    "Question": "Pregunta",
    "of": "de",
    "Correct.": "Correcto.",
    "Not quite.": "Casi.",
    "Answer breakdown": "Explicacion de respuestas",
    "Correct": "Correcta",
    "does not match the main requirement in this question.": "no coincide con el requisito principal de esta pregunta.",
    "Show": "Mostrar",
    "Check": "Revisar",
    "Prompt": "Pregunta",
    "Answer": "Respuesta",
    "Topics": "Temas",
    "Topic": "Tema",
    "Saved": "Guardada",
    "Save": "Guardar",
    "Shuffle": "Mezclar",
    "Flip": "Voltear",
    "Card Topics": "Temas de tarjetas",
    "All Flash Cards": "Todas las tarjetas",
    "Saved Flash Cards": "Tarjetas guardadas",
    "All subjects": "Todos los temas",
    "Saved cards": "Tarjetas guardadas",
    "cards": "tarjetas",
    "Search": "Buscar",
    "Search commands, files, topics...": "Busca comandos, archivos, temas...",
    "Try sudoers, sticky, nmcli, dnf, systemctl, /etc/passwd, or stderr.": "Prueba sudoers, sticky, nmcli, dnf, systemctl, /etc/passwd o stderr.",
    "No matches yet. Try a shorter command or topic word.": "Sin resultados. Prueba un comando o tema mas corto.",
    "Swipe left or right on lesson, quiz, and flash card screens. Progress stays on this device.": "Desliza izquierda o derecha en lecciones, quizzes y tarjetas. El progreso se guarda en este dispositivo."
  },
  topics: {
    exam: {
      title: "Mapa Del Final",
      lessons: [
        {
          title: "Que Premia El Examen",
          body: [
            "Tu final de Linux premia reconocer el comando correcto. Lee el escenario, identifica la tarea exacta y elige el comando, opcion, archivo o bit de permiso que corresponde.",
            "La guia enfatiza anatomia de comandos, ubicaciones del sistema de archivos, permisos, enlaces, usuarios y grupos, sudo, vim, man pages, redireccion, variables y tareas practicas.",
            "Los capitulos de Red Hat agregan DNF, sistemas de archivos, unidades systemd, redes con NetworkManager y servicios de red seguros."
          ],
          remember: "Tarea de la pregunta + herramienta exacta de Linux = respuesta."
        },
        {
          title: "Patrones De Alto Valor",
          body: [
            "Para rutas y archivos, practica pwd, cd, ls, cp, mv, mkdir -p, touch, rm, df, du y dd.",
            "Para cuentas: UID de root es 0; /etc/passwd guarda campos de cuenta; /etc/shadow guarda hashes; /etc/group guarda grupos; /etc/sudoers guarda reglas sudo.",
            "Para administracion: usermod -aG agrega grupos, visudo edita sudoers con seguridad, chmod cambia permisos y systemctl controla servicios."
          ],
          remember: "-aG agrega. -G sin -a reemplaza. Esa trampa sale mucho."
        },
        {
          title: "Receta Practica",
          body: [
            "Crea un usuario con useradd y luego define su contrasena con passwd. Crea un grupo Admin con GID personalizado usando groupadd -g.",
            "Verifica un usuario sin echo, editor ni getent buscando en /etc/passwd con grep y redirigiendo a un archivo.",
            "Usa sudo -u usuario comando para ejecutar un solo comando como otro usuario sin cambiar completamente de sesion."
          ],
          remember: "Las preguntas practicas son recetas pequenas. Memoriza la forma del comando."
        }
      ]
    },
    basics: {
      title: "Bases De Linux",
      lessons: [
        {
          title: "Shell, Terminal, Prompt",
          body: [
            "Linux es modular. Puede ser escritorio grafico completo, servidor o aparato pequeno.",
            "El shell interpreta y ejecuta los comandos escritos en la linea de comandos. La terminal es el programa que hospeda el shell.",
            "En el prompt, $ normalmente indica usuario regular y # normalmente indica root."
          ],
          remember: "El shell ejecuta comandos. La terminal hospeda el shell."
        },
        {
          title: "Anatomia Del Comando",
          body: [
            "En ls -la /home, ls es el comando, -la es la opcion y /home es el argumento.",
            "Usa una barra invertida al final de una linea para continuar un comando largo en la siguiente linea.",
            "Tab autocompleta. Tab dos veces muestra posibilidades."
          ],
          remember: "Comando + opcion + argumento. El prompt no es parte del comando."
        },
        {
          title: "Persistencia Y Ayuda",
          body: [
            "Un archivo que sobrevive un reinicio es persistente. Los datos de runtime pueden desaparecer cuando se reinicia un proceso o sistema.",
            "El comando man abre paginas del manual. Las paginas man tienen nueve secciones.",
            "El orden comun es NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES y SEE ALSO."
          ],
          remember: "Si las opciones incluyen Examples, Description, Synopsis y Options, Synopsis va primero."
        }
      ]
    },
    filesystem: {
      title: "Archivos Y Rutas",
      lessons: [
        {
          title: "Jerarquia Del Sistema",
          body: [
            "/ es la raiz del sistema de archivos. /root es el home del usuario root.",
            "/home contiene los homes de usuarios regulares. En RHEL, linuxadmin normalmente usa /home/linuxadmin.",
            "/etc contiene la mayoria de configuracion; /usr contiene programas, bibliotecas y documentacion; /var contiene datos variables como logs."
          ],
          remember: "/home para usuarios regulares. /root para root. /etc para configuracion."
        },
        {
          title: "Navegacion Y Listados",
          body: [
            "pwd imprime la ruta absoluta del directorio actual.",
            "cd .. sube un directorio, cd ~ va al home y cd - regresa al directorio anterior.",
            "ls -l es listado largo, ls -a muestra ocultos, ls -la combina largo y todos, y ls -R lista recursivamente."
          ],
          remember: "Para todos los archivos en listado largo, elige -la o -al."
        },
        {
          title: "Manipulacion De Archivos",
          body: [
            "cp copia. Opciones utiles: -i pregunta antes de sobrescribir, -r copia recursiva, -p preserva atributos y -f fuerza.",
            "mv mueve y renombra. mkdir -p crea directorios padre e hijo en un solo comando.",
            "touch crea un archivo vacio o actualiza timestamps. rm elimina archivos; rm -r elimina directorios. df muestra espacio libre."
          ],
          remember: "mkdir /a/b/c falla si faltan padres. mkdir -p /a/b/c crea la ruta completa."
        }
      ]
    },
    permissions: {
      title: "Permisos Enlaces",
      lessons: [
        {
          title: "Leer Permisos",
          body: [
            "Una cadena de permisos tiene diez caracteres: tipo de archivo, permisos del dueno, permisos del grupo y permisos de otros.",
            "El primer caracter es - para archivo regular, d para directorio y l para enlace simbolico.",
            "En rwxrwxr-x, el tercer triplete r-x aplica a otros: todos excepto el usuario dueno y el grupo dueno."
          ],
          remember: "Dueno, grupo, otros. El tercer triplete es otros."
        },
        {
          title: "chmod Y Bits Especiales",
          body: [
            "chmod simbolico usa u, g, o o a con +, - o = y r, w o x. chmod u+r file da lectura al usuario dueno.",
            "Permisos octales usan r=4, w=2, x=1. 755 significa rwxr-xr-x.",
            "Bits especiales: 4 SUID, 2 SGID y 1 sticky bit. chmod 2775 agrega SGID; chmod 1777 agrega sticky."
          ],
          remember: "SUID=4, SGID=2, sticky=1."
        },
        {
          title: "Enlaces Hard Y Simbolicos",
          body: [
            "Un hard link apunta al mismo inode y aumenta el contador de enlaces en uno.",
            "Un enlace simbolico es un archivo pequeno que apunta a otro archivo por nombre o ruta.",
            "Si se borra el original, un hard link todavia accede a los datos. Un enlace simbolico se rompe si desaparece su ruta destino."
          ],
          remember: "Apunta por nombre significa enlace simbolico. Mismo inode significa hard link."
        }
      ]
    },
    users: {
      title: "Usuarios Grupos Sudo",
      lessons: [
        {
          title: "Archivos De Cuentas",
          body: [
            "/etc/passwd tiene registros con formato name:x:UID:GID:GECOS:home:shell. El tercer campo es UID y el ultimo es login shell.",
            "/etc/shadow guarda contrasenas cifradas. /etc/group guarda grupos. /etc/sudoers guarda reglas sudo.",
            "Root tiene UID 0. Un GID normalmente es un entero simple como 83 o 87589."
          ],
          remember: "/etc/passwd ultimo campo = login shell. Tercer campo = UID."
        },
        {
          title: "Comandos De Usuarios Y Grupos",
          body: [
            "useradd crea un usuario, passwd cambia contrasena y userdel -r elimina el usuario con su home.",
            "groupadd crea un grupo. groupadd -g GID nombre crea un grupo con GID personalizado.",
            "groups usuario e id usuario muestran membresia de grupos. Solo root puede cambiar el grupo dueno de un archivo."
          ],
          remember: "passwd cambia contrasenas, no chmod, sudo ni uid."
        },
        {
          title: "Sudo Y Grupos Suplementarios",
          body: [
            "usermod -aG grupo usuario agrega el usuario a grupos suplementarios. usermod -G sin -a reemplaza la lista.",
            "Usa visudo para editar /etc/sudoers con seguridad. Una regla de grupo empieza con signo de porcentaje.",
            "su - usuario cambia a una shell de login como otro usuario. sudo -u usuario comando ejecuta un comando como ese usuario."
          ],
          remember: "Agrega con -aG. Da sudo al grupo Admin con %Admin ALL=(ALL) ALL."
        }
      ]
    },
    vimman: {
      title: "Vim Y Man",
      lessons: [
        {
          title: "Modos De Vim",
          body: [
            "Los modos de Vim incluyen modo comando, modo insercion y modo visual. Exit no es un modo de Vim.",
            "Presiona i para entrar a modo insercion. Presiona Esc para regresar a modo comando.",
            "Usa :w para guardar, :q para salir, :wq para guardar y salir, y :q! para salir sin guardar."
          ],
          remember: "Si las opciones son visual, command, exit e insert, la respuesta que NO es modo es exit."
        },
        {
          title: "Edicion En Vim",
          body: [
            "dd borra la linea actual. yy copia, o yank, la linea actual. p pega.",
            "/texto busca hacia adelante ese texto.",
            ":%s/viejo/nuevo/g reemplaza viejo con nuevo en todo el archivo."
          ],
          remember: "dd borra linea, yy copia linea, p pega."
        },
        {
          title: "Secciones Del Manual",
          body: [
            "La seccion 1 contiene comandos de usuario, la seccion 5 contiene formatos de archivo y la seccion 8 contiene comandos de administracion.",
            "Usa man -k palabra para buscar nombres y descripciones de paginas man.",
            "Usa man N comando cuando necesitas una seccion especifica."
          ],
          remember: "Hay nueve secciones man. Synopsis aparece antes de Description, Options y Examples."
        }
      ]
    },
    shell: {
      title: "Redireccion Shell",
      lessons: [
        {
          title: "Descriptores De Archivo",
          body: [
            "La entrada estandar es el descriptor 0. La salida estandar es el descriptor 1. El error estandar es el descriptor 2.",
            "> redirige stdout y sobrescribe el archivo. >> redirige stdout y agrega al final del archivo.",
            "2> redirige stderr. 2>> agrega stderr al final."
          ],
          remember: "stdin=0, stdout=1, stderr=2."
        },
        {
          title: "Pipes Y Salida Combinada",
          body: [
            "Un pipe conecta el stdout de un comando al stdin del siguiente comando.",
            "2>&1 combina stderr dentro de stdout. &> archivo redirige stdout y stderr a un solo archivo.",
            "&>/dev/null descarta ambos streams. tee divide la salida hacia la pantalla y un archivo."
          ],
          remember: "Para redirigir los descriptores 1 y 2 a un archivo, elige &> archivo."
        },
        {
          title: "Variables Y Expansion",
          body: [
            "Define una variable de shell con VAR=valor. No pongas espacios alrededor del signo igual.",
            "Usa echo $VAR para imprimir la variable. export VAR la convierte en variable de entorno heredada por procesos hijos.",
            "Brace expansion puede crear nombres repetidos, como bob1.txt hasta bob10.txt."
          ],
          remember: "La asignacion simple vive en el shell actual. export la hace heredable."
        }
      ]
    },
    dnf: {
      title: "Paquetes DNF",
      lessons: [
        {
          title: "Repositorios Y Paquetes",
          body: [
            "DNF administra software desde repositorios RPM. Los repositorios proporcionan paquetes y metadata.",
            "Usa dnf search para buscar paquetes, dnf list para listar paquetes y dnf info para mostrar informacion de un paquete.",
            "Los archivos de configuracion de repositorios comunmente viven en /etc/yum.repos.d/."
          ],
          remember: "DNF es la herramienta de administracion de paquetes de RHEL para repositorios RPM."
        },
        {
          title: "Instalar, Actualizar, Quitar",
          body: [
            "dnf install instala paquetes. dnf update revisa y aplica actualizaciones disponibles.",
            "dnf remove quita paquetes instalados. DNF registra transacciones en history.",
            "dnf group list y dnf group install trabajan con grupos de paquetes."
          ],
          remember: "Instalar, actualizar, quitar e history: ese es el ritmo basico de DNF."
        },
        {
          title: "Automatizacion Y Seguridad",
          body: [
            "El paquete dnf-automatic puede automatizar actualizaciones de software.",
            "DNF automatic usa unidades timer de systemd para ejecutar trabajos de actualizacion con horario.",
            "Las actualizaciones de seguridad pueden manejarse aparte cuando el sistema esta configurado con metadata de seguridad."
          ],
          remember: "La automatizacion de DNF esta conectada a timers de systemd."
        }
      ]
    },
    systemd: {
      title: "Servicios systemd",
      lessons: [
        {
          title: "Unit Files",
          body: [
            "systemd usa unit files para describir servicios, targets, timers, sockets y otros objetos del sistema.",
            "Los unit files comunmente tienen secciones [Unit], [Service] e [Install].",
            "Los unit files predeterminados suelen estar en /usr/lib/systemd/system, mientras overrides y unidades personalizadas del administrador estan en /etc/systemd/system."
          ],
          remember: "/etc/systemd/system es para personalizaciones y overrides del administrador."
        },
        {
          title: "Administrar Servicios",
          body: [
            "systemctl status muestra el estado del servicio. start y stop controlan el estado actual en ejecucion.",
            "restart detiene e inicia un servicio. reload pide al servicio recargar configuracion sin reinicio completo cuando es compatible.",
            "enable hace que un servicio inicie al arranque. disable evita que inicie al arranque."
          ],
          remember: "start es ahora, enable es al arranque, enable --now hace ambos."
        },
        {
          title: "Targets Y Arranque",
          body: [
            "Los targets agrupan unidades en un estado del sistema. Graphical y multi-user son estados de arranque comunes.",
            "systemctl get-default muestra el target predeterminado. set-default cambia el target usado al arranque.",
            "systemd-analyze ayuda a examinar rendimiento del arranque."
          ],
          remember: "Targets son estados del sistema; services son daemons de larga ejecucion."
        }
      ]
    },
    networking: {
      title: "Redes",
      lessons: [
        {
          title: "Herramientas NetworkManager",
          body: [
            "NetworkManager administra conexiones de red en RHEL. nmcli es la herramienta de linea de comandos y nmtui es la interfaz de texto.",
            "Un perfil de conexion guarda configuracion de red. Un device es la interfaz de red real.",
            "Usa nmcli connection show para listar perfiles y nmcli device status para inspeccionar devices."
          ],
          remember: "Perfil es configuracion. Device es la interfaz fisica o virtual."
        },
        {
          title: "IP Estatica Y Dinamica",
          body: [
            "DHCP asigna configuracion dinamica de direccion. Direccionamiento estatico define IP, prefijo, gateway y DNS manualmente.",
            "nmcli puede modificar metodo IPv4, direcciones, gateway y DNS dentro de un perfil de conexion.",
            "Despues de cambios, reconecta el perfil o levantalo para aplicar la configuracion."
          ],
          remember: "IP estatica significa metodo manual mas direccion, prefijo, gateway y DNS."
        },
        {
          title: "Bonds, VLANs, Bridges",
          body: [
            "Un bond combina interfaces para redundancia o rendimiento, segun el modo de bonding.",
            "Una VLAN agrega una etiqueta para que una red fisica cargue multiples redes logicas.",
            "Un bridge conecta segmentos de red y es comun en virtualizacion."
          ],
          remember: "Bond = combinar enlaces. VLAN = etiquetar trafico. Bridge = conectar segmentos."
        }
      ]
    },
    security: {
      title: "Seguridad De Red",
      lessons: [
        {
          title: "OpenSSH",
          body: [
            "OpenSSH proporciona inicio de sesion remoto y transferencia de archivos cifrados. ssh conecta a un servidor y sshd es el daemon del servidor.",
            "La autenticacion por llaves usa una llave privada en el cliente y una llave publica instalada para la cuenta en el servidor.",
            "El hardening puede incluir deshabilitar autenticacion por contrasena, limitar usuarios permitidos y usar tipos de llave fuertes."
          ],
          remember: "ssh es el cliente. sshd es el servicio del servidor."
        },
        {
          title: "TLS Y Confianza",
          body: [
            "TLS protege comunicacion de red con certificados y llaves criptograficas.",
            "Una autoridad certificadora firma certificados para que los clientes puedan verificar la identidad del servidor.",
            "El trust store de todo el sistema controla cuales certificados CA confia el sistema."
          ],
          remember: "TLS prueba identidad y cifra trafico."
        },
        {
          title: "Firewalls Y VPNs",
          body: [
            "Un firewall del host controla servicios y puertos de red permitidos.",
            "Las VPN IPsec protegen trafico entre hosts o sitios. Libreswan es una implementacion comun de IPsec en RHEL.",
            "Cuando un servicio escucha en la red, revisa el servicio, reglas de firewall, direccion, ruta y logs."
          ],
          remember: "Para problemas de acceso remoto, revisa sshd y el firewall."
        }
      ]
    },
    storage: {
      title: "Almacenamiento Y Montajes",
      lessons: [
        {
          title: "Mount Points Y fstab",
          body: [
            "Linux conecta sistemas de archivos a directorios llamados mount points. Mientras un sistema de archivos esta montado en un directorio, ese directorio muestra el contenido montado.",
            "El comando mount puede conectar un device, label o UUID a un mount point. Si faltan detalles, mount revisa /etc/fstab para entradas guardadas.",
            "Los montajes persistentes van en /etc/fstab. UUIDs y labels son mas seguros que nombres /dev/sdX porque esos nombres pueden cambiar entre arranques."
          ],
          remember: "Montaje temporal: mount. Montaje persistente: /etc/fstab."
        },
        {
          title: "XFS, ext4, NFS, SMB",
          body: [
            "RHEL soporta sistemas de archivos locales como XFS y ext4, ademas de sistemas de archivos de red como NFS y SMB.",
            "XFS es el sistema de archivos predeterminado de RHEL y esta disenado para escalar. ext4 es un sistema de archivos Linux legado y muy usado.",
            "NFS y SMB dan acceso a archivos por red. Usalos cuando el almacenamiento se comparte desde otro servidor en vez de estar conectado localmente."
          ],
          remember: "Disco local: XFS/ext4. Share de red: NFS/SMB."
        },
        {
          title: "Bloques De LVM",
          body: [
            "Logical Volume Manager agrega una capa de abstraccion sobre el almacenamiento fisico para crear, redimensionar, renombrar y quitar storage con mas flexibilidad.",
            "Las piezas principales son physical volumes, volume groups y logical volumes. Un physical volume es un disco o particion preparado para LVM, un volume group junta espacio PV y un logical volume es el device usable.",
            "El flujo comun de comandos es pvcreate, vgcreate, lvcreate, luego crear sistema de archivos y montarlo."
          ],
          remember: "PV alimenta VG; VG asigna LV; LV recibe el sistema de archivos."
        }
      ]
    },
    processmedia: {
      title: "Procesos Medios Archivos",
      lessons: [
        {
          title: "Tipo De Archivo Y Visualizacion",
          body: [
            "Linux no requiere extensiones de archivo para decidir el tipo. El comando file examina contenido y metadata para reportar el tipo.",
            "cat imprime contenido de archivos y puede concatenar multiples archivos. Usalo para archivos cortos, revisiones rapidas o redirigir contenido.",
            "less es mejor para archivos largos porque puedes desplazarte y buscar. head muestra el inicio de un archivo y tail muestra el final; tail -f sigue un log mientras crece."
          ],
          remember: "file identifica tipo. cat muestra contenido. less navega. head empieza. tail termina o sigue."
        },
        {
          title: "Procesos Y Estados",
          body: [
            "Un proceso es una instancia en ejecucion de un programa. ps muestra snapshots de procesos, top da una vista en vivo y pgrep encuentra PIDs por nombre.",
            "Estados comunes incluyen R para running, S para sleeping, T para stopped y Z para zombie. Un zombie ya termino pero mantiene una entrada hasta que su parent recoge su estado.",
            "Cada proceso tiene un PID. Un proceso padre tiene PPID. Muchas herramientas permiten filtrar o actuar sobre procesos por PID, nombre de comando, usuario o terminal."
          ],
          remember: "ps es snapshot. top es en vivo. PID identifica un proceso."
        },
        {
          title: "Signals Y Prioridad",
          body: [
            "kill envia una signal a un proceso por PID. La signal predeterminada es TERM, que pide al proceso detenerse limpiamente.",
            "kill -9 envia KILL, que fuerza la terminacion y no puede atraparse ni ignorarse. Usalo cuando TERM normal no funciona.",
            "nice inicia un proceso con prioridad ajustada. renice cambia prioridad de un proceso existente. Valores nice mas bajos significan mayor prioridad de scheduling; usuarios regulares normalmente solo pueden aumentar el valor nice."
          ],
          remember: "TERM pide. KILL fuerza. nice inicia con prioridad. renice cambia un proceso existente."
        },
        {
          title: "Medios Removibles Y Devices",
          body: [
            "lsblk lista block devices en forma de arbol, lo cual ayuda a identificar discos, particiones y medios removibles. blkid muestra UUIDs y labels de sistemas de archivos.",
            "Un device debe tener un sistema de archivos montado en un directorio antes de navegar sus archivos. mount lo conecta y umount lo desconecta.",
            "Si un device removible no aparece claramente, revisa lsblk, blkid, dmesg o journalctl para mensajes de deteccion. Siempre desmonta antes de retirar medios para evitar perdida de datos."
          ],
          remember: "Detecta con lsblk/blkid. Conecta con mount. Desconecta seguro con umount."
        }
      ]
    },
    selinux: {
      title: "SELinux Firewalld",
      lessons: [
        {
          title: "Modos SELinux",
          body: [
            "SELinux puede estar enabled o disabled. Cuando esta enabled, corre en modo enforcing o permissive.",
            "Enforcing aplica politica y deniega acciones que la violan. Permissive registra lo que se denegaria pero no lo bloquea, lo cual ayuda a troubleshooting.",
            "setenforce cambia entre enforcing y permissive solo hasta reiniciar. Los cambios permanentes de modo se hacen en configuracion SELinux o parametros del kernel."
          ],
          remember: "getenforce reporta el modo. setenforce es temporal."
        },
        {
          title: "Etiquetas Y Troubleshooting",
          body: [
            "Las decisiones SELinux dependen de etiquetas, tambien llamadas contextos. Un archivo con contexto incorrecto puede ser denegado aunque los permisos Unix normales se vean correctos.",
            "Usa restorecon para restaurar contextos predeterminados. Usa semanage fcontext cuando necesitas definir una regla persistente de contexto personalizado.",
            "Cuando un servicio de red falla solo bajo SELinux, revisa audit logs y contextos antes de deshabilitar proteccion."
          ],
          remember: "Permisos Unix responden quien. Etiquetas SELinux responden que politica permite el acceso."
        },
        {
          title: "Runtime Y Permanent En Firewalld",
          body: [
            "firewalld usa zonas para aplicar distintos niveles de confianza y conjuntos de reglas a interfaces o sources.",
            "Los cambios runtime del firewall toman efecto inmediatamente pero no sobreviven reload o restart a menos que se guarden. Los cambios permanent sobreviven, pero necesitan reload para aplicarse.",
            "Los servicios predefinidos abren los puertos requeridos por un servicio, para permitir ssh o http sin memorizar cada puerto."
          ],
          remember: "Runtime es ahora. Permanent es despues de reload/restart. Usa --runtime-to-permanent para guardar reglas runtime."
        }
      ]
    }
  },
  flash: {
    "fd-stdin": ["Descriptor STDIN", "0"],
    "fd-stdout": ["Descriptor STDOUT", "1"],
    "fd-stderr": ["Descriptor STDERR", "2"],
    "shell": ["Que interpreta y ejecuta comandos?", "El shell"],
    "terminal": ["Que hospeda el shell?", "La terminal"],
    "cmd-arg": ["En ls -la /home, que es /home?", "Argumento"],
    "cmd-opt": ["En ls -la /home, que es -la?", "Opcion"],
    "line-cont": ["Caracter de continuacion de linea", "Barra invertida"],
    "tab": ["Tecla para autocompletar", "Tab"],
    "persistent": ["Un archivo que sobrevive reinicio es...", "Persistente"],
    "root-dir": ["Raiz del sistema de archivos", "/"],
    "root-home": ["Home del usuario root", "/root"],
    "user-home": ["Homes de usuarios regulares", "/home"],
    "etc": ["Mayoria de configuracion del sistema", "/etc"],
    "pwd": ["Imprime ruta absoluta actual", "pwd"],
    "cd-up": ["Subir un directorio", "cd .."],
    "ls-long-all": ["Todos los archivos en listado largo", "ls -la o ls -al"],
    "mkdir-p": ["Crear directorios anidados", "mkdir -p padre/hijo"],
    "perm-other": ["En rwxrwxr-x, el tercer triplete aplica a...", "Otros"],
    "suid": ["Digito octal SUID", "4"],
    "sgid": ["Digito octal SGID", "2"],
    "sticky": ["Digito octal sticky bit", "1"],
    "append-group": ["Agregar grupo suplementario", "usermod -aG grupo usuario"],
    "sudoers": ["Editar /etc/sudoers con seguridad", "visudo"],
    "vim-not-mode": ["No es modo de Vim", "exit"],
    "redirect-both": ["Redirigir stdout y stderr", "&> archivo"],
    "export": ["Hacer variable heredable por procesos hijos", "export VAR"],
    "dnf-search": ["Buscar paquetes con DNF", "dnf search termino"],
    "enable-now": ["Habilitar al arranque e iniciar ahora", "systemctl enable --now servicio"],
    "nmcli": ["Herramienta CLI de NetworkManager", "nmcli"],
    "ssh-client": ["Comando cliente OpenSSH", "ssh"],
    "firewall": ["Listar ajustes activos de firewall", "firewall-cmd --list-all"],
    "persistent-mount": ["Archivo para montajes persistentes", "/etc/fstab"],
    "getenforce": ["Revisar modo SELinux", "getenforce"],
    "restorecon": ["Restaurar contextos SELinux", "restorecon"],
    "cp-i": ["Opcion de cp que pregunta antes de sobrescribir", "-i"],
    "mv": ["mv puede mover y renombrar?", "Verdadero"],
    "df": ["Revisar espacio libre en disco", "df"],
    "chmod-ur": ["Que hace chmod u+r file?", "Da permiso de lectura al usuario dueno"],
    "octal-755": ["755 significa...", "rwxr-xr-x"],
    "hard-link": ["Un hard link apunta a...", "El mismo inode"],
    "soft-link": ["Enlace que apunta por nombre/ruta", "Enlace simbolico"],
    "passwd-file": ["Ultimo campo de /etc/passwd", "Login shell"],
    "passwd-uid": ["Tercer campo de /etc/passwd", "UID"],
    "root-uid": ["UID de root", "0"],
    "passwd-cmd": ["Cambiar la contrasena de un usuario", "passwd usuario"],
    "replace-group": ["Opcion peligrosa que reemplaza grupos", "usermod -G"],
    "admin-sudo": ["Regla sudo completa para grupo Admin", "%Admin ALL=(ALL) ALL"],
    "sudo-u": ["Ejecutar un comando como otro usuario", "sudo -u usuario comando"],
    "vim-insert": ["Entrar a modo insercion", "i"],
    "vim-command": ["Regresar a modo comando", "Esc"],
    "vim-save-quit": ["Guardar y salir en Vim", ":wq"],
    "man-sections": ["Cuantas secciones man hay?", "9"],
    "null-both": ["Descartar stdout y stderr", "&>/dev/null"],
    "pipe": ["Un pipe conecta...", "stdout de un comando al stdin del siguiente"],
    "brace": ["Crear bob1.txt hasta bob10.txt", "touch bob{1..10}.txt"],
    "dnf-installed": ["Listar paquetes instalados", "dnf list installed"],
    "dnf-history": ["Ver transacciones DNF", "dnf history"],
    "dnf-auto": ["DNF automatic usa para programar...", "timers de systemd"],
    "unit-file": ["Overrides de unidades systemd del administrador viven en...", "/etc/systemd/system"],
    "reload-daemon": ["Recargar systemd despues de editar unit files", "systemctl daemon-reload"],
    "target": ["Un target de systemd significa...", "Un estado agrupado del sistema"],
    "nmtui": ["Interfaz de texto de NetworkManager", "nmtui"],
    "profile": ["Perfil vs device en NetworkManager", "Perfil=configuracion, device=interfaz"],
    "vlan": ["Que hace una VLAN?", "Etiqueta trafico para una red logica"],
    "ssh-daemon": ["Daemon del servidor OpenSSH", "sshd"],
    "trust": ["Comando para certificados CA del sistema", "trust"],
    "mount-point": ["Directorio donde se conecta un sistema de archivos", "Mount point"],
    "uuid": ["Identificador estable para fstab", "UUID"],
    "xfs": ["Sistema de archivos local predeterminado de RHEL", "XFS"],
    "lvm-pv": ["Physical volume de LVM", "Disco o particion preparado para LVM"],
    "lvm-vg": ["Volume group de LVM", "Pool de espacio de physical volumes"],
    "lvm-lv": ["Logical volume de LVM", "Device de bloque virtual usable"],
    "file-cmd": ["Identificar tipo de archivo por contenido", "file"],
    "cat-cmd": ["Ver o concatenar archivos cortos", "cat"],
    "less-cmd": ["Navegar un archivo largo", "less"],
    "head-tail": ["Ver inicio/final de un archivo", "head y tail"],
    "ps-cmd": ["Snapshot de procesos", "ps"],
    "top-cmd": ["Vista en vivo de procesos", "top"],
    "kill-term": ["Signal predeterminada de kill", "TERM"],
    "kill-nine": ["Signal que fuerza terminacion", "KILL (-9)"],
    "nice-cmd": ["Iniciar proceso con prioridad ajustada", "nice"],
    "renice-cmd": ["Cambiar prioridad de un proceso existente", "renice"],
    "lsblk-cmd": ["Listar block devices", "lsblk"],
    "umount-cmd": ["Desconectar un sistema de archivos montado", "umount"],
    "setenforce": ["Cambiar SELinux enforcing/permissive temporalmente", "setenforce"],
    "permissive": ["Modo SELinux que registra pero no deniega", "Permisivo"],
    "firewalld-zone": ["Grupo de confianza/reglas en firewalld", "Zona"],
    "runtime-permanent": ["Guardar cambios runtime de firewalld", "firewall-cmd --runtime-to-permanent"]
  }
};

const flashCardBank = [
  ["fd-stdin", "STDIN file descriptor", "0", "shell"],
  ["fd-stdout", "STDOUT file descriptor", "1", "shell"],
  ["fd-stderr", "STDERR file descriptor", "2", "shell"],
  ["shell", "What interprets and executes commands?", "The shell", "basics"],
  ["terminal", "What hosts the shell?", "The terminal", "basics"],
  ["cmd-arg", "In ls -la /home, what is /home?", "Argument", "basics"],
  ["cmd-opt", "In ls -la /home, what is -la?", "Option", "basics"],
  ["line-cont", "Character for line continuation", "Backslash", "basics"],
  ["tab", "Autocomplete key", "Tab", "basics"],
  ["persistent", "A file that survives reboot is...", "Persistent", "basics"],
  ["root-dir", "Root of the filesystem", "/", "filesystem"],
  ["root-home", "Root user's home", "/root", "filesystem"],
  ["user-home", "Regular users' home directories", "/home", "filesystem"],
  ["etc", "Most system config files", "/etc", "filesystem"],
  ["pwd", "Print absolute current path", "pwd", "filesystem"],
  ["cd-up", "Move up one directory", "cd ..", "filesystem"],
  ["ls-long-all", "All files in long listing", "ls -la or ls -al", "filesystem"],
  ["mkdir-p", "Create nested dirs in one command", "mkdir -p parent/child", "filesystem"],
  ["cp-i", "cp option that prompts before overwrite", "-i", "filesystem"],
  ["mv", "Can mv move and rename?", "True", "filesystem"],
  ["df", "Check free disk space", "df", "filesystem"],
  ["perm-other", "In rwxrwxr-x, third triplet applies to...", "Other", "permissions"],
  ["chmod-ur", "chmod u+r file does what?", "Gives user owner read access", "permissions"],
  ["octal-755", "755 means...", "rwxr-xr-x", "permissions"],
  ["suid", "SUID leading octal digit", "4", "permissions"],
  ["sgid", "SGID leading octal digit", "2", "permissions"],
  ["sticky", "Sticky bit leading octal digit", "1", "permissions"],
  ["hard-link", "Hard link points to...", "The same inode", "permissions"],
  ["soft-link", "Link that points by name/path", "Symbolic link", "permissions"],
  ["passwd-file", "/etc/passwd last field", "Login shell", "users"],
  ["passwd-uid", "/etc/passwd third field", "UID", "users"],
  ["root-uid", "Root UID", "0", "users"],
  ["passwd-cmd", "Change a user's password", "passwd user", "users"],
  ["append-group", "Append supplementary group", "usermod -aG group user", "users"],
  ["replace-group", "Dangerous group replacement option", "usermod -G", "users"],
  ["sudoers", "Safely edit /etc/sudoers", "visudo", "users"],
  ["admin-sudo", "Admin group full sudo rule", "%Admin ALL=(ALL) ALL", "users"],
  ["sudo-u", "Run one command as another user", "sudo -u user command", "users"],
  ["vim-not-mode", "Not a Vim mode", "exit", "vimman"],
  ["vim-insert", "Enter insert mode", "i", "vimman"],
  ["vim-command", "Return to command mode", "Esc", "vimman"],
  ["vim-save-quit", "Save and quit in Vim", ":wq", "vimman"],
  ["man-sections", "How many man sections?", "9", "vimman"],
  ["redirect-both", "Redirect stdout and stderr", "&> file", "shell"],
  ["null-both", "Discard stdout and stderr", "&>/dev/null", "shell"],
  ["pipe", "Pipe connects...", "stdout of one command to stdin of the next", "shell"],
  ["export", "Make shell variable inherited by child processes", "export VAR", "shell"],
  ["brace", "Create bob1.txt through bob10.txt", "touch bob{1..10}.txt", "shell"],
  ["dnf-search", "Find packages with DNF", "dnf search term", "dnf"],
  ["dnf-installed", "List installed packages", "dnf list installed", "dnf"],
  ["dnf-history", "View DNF transactions", "dnf history", "dnf"],
  ["dnf-auto", "DNF automatic scheduling uses...", "systemd timers", "dnf"],
  ["unit-file", "Admin systemd unit overrides live under...", "/etc/systemd/system", "systemd"],
  ["enable-now", "Enable at boot and start now", "systemctl enable --now service", "systemd"],
  ["reload-daemon", "Reload systemd after unit file edits", "systemctl daemon-reload", "systemd"],
  ["target", "systemd target means...", "A grouped system state", "systemd"],
  ["nmcli", "NetworkManager command-line tool", "nmcli", "networking"],
  ["nmtui", "NetworkManager text UI", "nmtui", "networking"],
  ["profile", "NetworkManager profile vs device", "Profile=config, device=interface", "networking"],
  ["vlan", "VLAN does what?", "Tags traffic for a logical network", "networking"],
  ["ssh-client", "OpenSSH client command", "ssh", "security"],
  ["ssh-daemon", "OpenSSH server daemon", "sshd", "security"],
  ["trust", "System-wide CA certificate command", "trust", "security"],
  ["firewall", "List active firewall settings", "firewall-cmd --list-all", "security"],
  ["mount-point", "Directory where a filesystem is attached", "Mount point", "storage"],
  ["persistent-mount", "File for persistent mounts", "/etc/fstab", "storage"],
  ["uuid", "Stable device identifier for fstab", "UUID", "storage"],
  ["xfs", "Default RHEL local filesystem", "XFS", "storage"],
  ["lvm-pv", "LVM physical volume", "Disk or partition prepared for LVM", "storage"],
  ["lvm-vg", "LVM volume group", "Pool of physical volume space", "storage"],
  ["lvm-lv", "LVM logical volume", "Usable virtual block device", "storage"],
  ["file-cmd", "Identify file type by contents", "file", "processmedia"],
  ["cat-cmd", "View or concatenate short files", "cat", "processmedia"],
  ["less-cmd", "Browse a long file", "less", "processmedia"],
  ["head-tail", "View file beginning/end", "head and tail", "processmedia"],
  ["ps-cmd", "Process snapshot command", "ps", "processmedia"],
  ["top-cmd", "Live process monitor", "top", "processmedia"],
  ["kill-term", "Default kill signal", "TERM", "processmedia"],
  ["kill-nine", "Forceful termination signal", "KILL (-9)", "processmedia"],
  ["nice-cmd", "Start a process with adjusted priority", "nice", "processmedia"],
  ["renice-cmd", "Change priority of an existing process", "renice", "processmedia"],
  ["lsblk-cmd", "List block devices", "lsblk", "processmedia"],
  ["umount-cmd", "Detach a mounted filesystem", "umount", "processmedia"],
  ["getenforce", "Check SELinux mode", "getenforce", "selinux"],
  ["setenforce", "Temporarily switch SELinux enforcing/permissive", "setenforce", "selinux"],
  ["permissive", "SELinux mode that logs but does not deny", "Permissive", "selinux"],
  ["restorecon", "Restore default SELinux contexts", "restorecon", "selinux"],
  ["firewalld-zone", "firewalld trust/rule grouping", "Zone", "selinux"],
  ["runtime-permanent", "Save runtime firewalld changes", "firewall-cmd --runtime-to-permanent", "selinux"]
].map(([id, term, definition, topic]) => ({ id, term, definition, topic }));

const questionBank = [
  q("basics", "What interprets and executes commands typed at the command line?", ["The shell", "The terminal", "The monitor", "The prompt"], 0, "The shell interprets and executes commands. The terminal hosts the shell."),
  q("basics", "In ls -la /home, what is -la?", ["Command", "Option", "Argument", "Prompt"], 1, "-la modifies the ls command, so it is an option."),
  q("basics", "In ls -la /home, what is /home?", ["Command", "Option", "Argument", "Prompt"], 2, "/home is the path the command acts on, so it is an argument."),
  q("basics", "Which character lets you continue a long command onto the next line?", ["Backslash", "Forward slash", "Pipe", "Ampersand"], 0, "A trailing backslash continues the command on the next line."),
  q("basics", "Which key autocompletes commands and paths?", ["Esc", "Tab", "Ctrl+C", "F1"], 1, "Tab autocompletes; Tab Tab lists possibilities."),
  q("filesystem", "Which directory contains regular users' home directories?", ["/home", "/root", "/etc", "/usr"], 0, "/home contains home directories for regular users."),
  q("filesystem", "Which directory holds most system configuration files?", ["/var", "/etc", "/usr/bin", "/tmp"], 1, "/etc is the main configuration directory."),
  q("filesystem", "Which command prints the absolute path of the current working directory?", ["pwd", "cd", "ls", "path"], 0, "pwd prints the working directory."),
  q("filesystem", "Which command creates nested directories in one command?", ["mkdir CSN/lasvegas", "mkdir -p CSN/lasvegas", "touch CSN/lasvegas", "cp -r CSN/lasvegas"], 1, "mkdir -p creates missing parent directories."),
  q("filesystem", "Which command checks free disk space?", ["dd", "df", "du", "free"], 1, "df reports filesystem disk free space."),
  q("filesystem", "mv can move and rename files.", ["True", "False"], 0, "mv is used for both moving and renaming."),
  q("permissions", "In rwxrwxr-x, who does the third permission triplet apply to?", ["User owner", "Group owner", "Other", "Root only"], 2, "The triplets are user, group, and other."),
  q("permissions", "What does chmod u+r file do?", ["Gives the user owner read permission", "Removes user read permission", "Gives everyone read permission", "Makes the file executable"], 0, "u+r adds read permission for the user owner."),
  q("permissions", "What does the leading 2 add in chmod 2775 dir?", ["SUID", "SGID", "Sticky bit", "Execute for other"], 1, "Leading 2 sets SGID."),
  q("permissions", "Which special bit lets only the file owner delete files in a writable shared directory?", ["SUID", "SGID", "Sticky bit", "Setcap"], 2, "Sticky bit restricts deletion in shared directories such as /tmp."),
  q("permissions", "Which link type points to the same inode and increases the link count?", ["Symbolic link", "Hard link", "Soft link", "Mount link"], 1, "A hard link points to the same inode."),
  q("permissions", "A link that points to another file by name or path is a...", ["Hard link", "Symbolic link", "Device file", "Directory entry only"], 1, "A symbolic link stores the target path."),
  q("users", "What is the UID of root?", ["1", "99", "0", "1000"], 2, "Root's UID is 0."),
  q("users", "What is the last field of an /etc/passwd record?", ["UID", "GID", "Home directory", "Login shell"], 3, "The format ends with the login shell."),
  q("users", "Which command changes a user's password?", ["chmod user", "sudo user", "passwd user", "uid user"], 2, "passwd changes passwords."),
  q("users", "Which command appends jdoe to Admin without removing other groups?", ["sudo usermod -G Admin jdoe", "sudo usermod -aG Admin jdoe", "sudo groupmod -a Admin jdoe", "sudo useradd -G Admin jdoe"], 1, "-aG appends supplementary groups."),
  q("users", "Why is usermod -G Admin jdoe risky?", ["It deletes the user", "It replaces supplementary groups without -a", "It changes UID to 0", "It disables login"], 1, "-G sets the supplementary group list; -a appends."),
  q("users", "Which tool should safely edit /etc/sudoers?", ["vim directly", "nano directly", "visudo", "passwd"], 2, "visudo validates sudoers syntax."),
  q("users", "Which sudoers line grants the Admin group full sudo?", ["Admin ALL=(ALL) ALL", "%Admin ALL=(ALL) ALL", "group Admin sudo", "sudo Admin ALL"], 1, "A percent sign identifies a group in sudoers."),
  q("vimman", "Which is NOT a Vim mode?", ["visual", "command", "exit", "insert"], 2, "Exit is an action, not a mode."),
  q("vimman", "Which Vim command saves and quits?", [":w", ":q", ":wq", ":q!"], 2, ":wq writes and quits."),
  q("vimman", "Which Vim command deletes the current line?", ["dd", "yy", "p", "/text"], 0, "dd deletes the current line."),
  q("vimman", "How many manual sections are there?", ["3", "5", "7", "9"], 3, "The Linux manual is organized into nine sections."),
  q("vimman", "Out of Examples, Description, Synopsis, and Options, which man page section appears first?", ["Examples", "Description", "Synopsis", "Options"], 2, "Synopsis appears before Description, Options, and Examples."),
  q("shell", "Which file descriptor is stderr?", ["0", "1", "2", "3"], 2, "stderr is file descriptor 2."),
  q("shell", "What is the difference between > and >>?", ["> appends; >> overwrites", "> overwrites; >> appends", "Both append", "Both redirect stderr only"], 1, "> overwrites and >> appends."),
  q("shell", "Which syntax redirects both stdout and stderr to a file?", ["2> file", "1>2 file", "&> file", "| file"], 2, "&> redirects both output streams."),
  q("shell", "Which syntax discards both stdout and stderr?", ["2>/dev/null", "&>/dev/null", ">/dev/null only", "| /dev/null"], 1, "&>/dev/null sends both streams to /dev/null."),
  q("shell", "What does a pipe do?", ["Connects stdout to stdin of the next command", "Copies files", "Changes file ownership", "Starts a service"], 0, "The pipe operator connects commands."),
  q("shell", "How do you make FAKE available to child processes?", ["source FAKE", "export FAKE", "echo FAKE", "sudo FAKE"], 1, "export promotes a shell variable to the environment."),
  q("dnf", "Which tool manages RHEL software from RPM repositories?", ["apt", "dnf", "pacman", "pip"], 1, "DNF manages RPM repository content on RHEL."),
  q("dnf", "Which command searches repositories for a package?", ["dnf search term", "dnf start term", "dnf find-local term", "dnf grep term"], 0, "dnf search searches package metadata."),
  q("dnf", "Which command displays package details?", ["dnf info package", "dnf details package", "dnf describe package", "dnf what package"], 0, "dnf info displays package information."),
  q("dnf", "Which command shows DNF transactions?", ["dnf records", "dnf history", "dnf log", "dnf timeline"], 1, "dnf history lists transactions."),
  q("dnf", "DNF automatic uses which systemd unit type for scheduled runs?", ["socket", "timer", "mount", "target"], 1, "Scheduled DNF automatic runs use systemd timers."),
  q("systemd", "Which command shows a service's current state?", ["systemctl status sshd", "systemctl showboot sshd", "service enable sshd", "dnf status sshd"], 0, "systemctl status displays service state and recent logs."),
  q("systemd", "Which command starts a service now and enables it at boot?", ["systemctl start --boot sshd", "systemctl enable --now sshd", "systemctl boot sshd", "systemctl permanent sshd"], 1, "enable --now both enables and starts."),
  q("systemd", "After editing a unit file, which command reloads systemd's unit file state?", ["systemctl reload-units", "systemctl daemon-reload", "systemctl restart systemd", "systemd refresh"], 1, "daemon-reload makes systemd reread unit files."),
  q("systemd", "Administrator custom systemd units and overrides commonly live in...", ["/etc/systemd/system", "/home/systemd", "/var/log/systemd", "/usr/bin/systemd"], 0, "/etc/systemd/system is for administrator units and overrides."),
  q("systemd", "What is a systemd target?", ["A grouped system state", "A package repository", "A user password file", "A firewall zone only"], 0, "Targets group units into boot or runtime states."),
  q("networking", "Which command-line tool manages NetworkManager connections?", ["ifcfg", "nmcli", "netedit", "routeonly"], 1, "nmcli is NetworkManager's CLI."),
  q("networking", "What is nmtui?", ["A kernel module", "A text UI for NetworkManager", "A package manager", "A password file"], 1, "nmtui is the text interface for NetworkManager."),
  q("networking", "In NetworkManager, what is a connection profile?", ["A saved network configuration", "The physical cable", "The firewall log", "A DNS record only"], 0, "Profiles store settings; devices are interfaces."),
  q("networking", "What does a VLAN do?", ["Encrypts SSH", "Tags traffic for a logical network", "Deletes routes", "Creates users"], 1, "VLANs tag traffic to separate logical networks."),
  q("networking", "What does a bridge commonly do?", ["Connects network segments", "Changes passwords", "Installs packages", "Writes unit files"], 0, "A bridge connects network segments and is common in virtualization."),
  q("security", "Which command is the OpenSSH client?", ["sshd", "ssh", "scp-server", "tlsd"], 1, "ssh is the client command."),
  q("security", "What is sshd?", ["The SSH server daemon", "A package repository", "A text editor", "A disk tool"], 0, "sshd is the OpenSSH server service."),
  q("security", "What does TLS mainly provide?", ["Plain text log storage", "Encrypted network communication and identity validation", "Disk partitioning", "Package installation"], 1, "TLS encrypts traffic and uses certificates for identity."),
  q("security", "Which command lists active firewalld settings?", ["firewall-cmd --list-all", "ssh --firewall", "dnf firewall list", "systemctl firewall"], 0, "firewall-cmd --list-all shows active zone settings."),
  q("security", "For SSH access problems, what should you check?", ["Only the username", "sshd status, firewall, address, route, and logs", "Only DNF history", "Only Vim mode"], 1, "Remote access depends on service, firewall, network, and logs."),
  q("storage", "Which file stores persistent filesystem mounts?", ["/etc/passwd", "/etc/fstab", "/etc/group", "/var/log/messages"], 1, "/etc/fstab stores mount entries that should persist across boots."),
  q("storage", "Why are UUIDs useful in /etc/fstab?", ["They are stable identifiers when device names change", "They replace passwords", "They disable SELinux", "They start services"], 0, "UUIDs identify filesystems more reliably than non-persistent device names such as /dev/sdb1."),
  q("storage", "Which RHEL local filesystem is the default?", ["FAT32", "XFS", "NFS", "SMB"], 1, "XFS is the default RHEL local filesystem."),
  q("storage", "Which pair are network file systems?", ["XFS and ext4", "NFS and SMB", "LVM and VDO", "SUID and SGID"], 1, "NFS and SMB provide network file access."),
  q("storage", "In LVM, what is a volume group?", ["A pool of space made from physical volumes", "A user group in /etc/group", "A firewall zone", "A systemd target"], 0, "A VG pools PV space and allocates logical volumes."),
  q("storage", "What is the usual LVM build order?", ["lvcreate, vgcreate, pvcreate", "pvcreate, vgcreate, lvcreate", "mkfs, passwd, chmod", "mount, ssh, dnf"], 1, "Prepare PVs, create a VG, then create LVs."),
  q("processmedia", "Which command identifies a file's type by examining its contents?", ["cat", "file", "less", "tail"], 1, "file reports file type by inspecting contents and metadata."),
  q("processmedia", "Which command is best for paging through a long text file?", ["less", "cat", "touch", "kill"], 0, "less lets you scroll and search through long files."),
  q("processmedia", "Which command follows new lines added to a growing log file?", ["head -n 5 log", "tail -f log", "file log", "ps log"], 1, "tail -f follows appended log output."),
  q("processmedia", "Which command shows a snapshot of running processes?", ["ps", "top", "nice", "umount"], 0, "ps shows a process snapshot."),
  q("processmedia", "Which command gives a live updating process view?", ["file", "top", "cat", "lsblk"], 1, "top displays an interactive live process view."),
  q("processmedia", "In process state letters, what does Z commonly mean?", ["Zombie", "Sleeping", "Running", "Stopped"], 0, "Z indicates a zombie process."),
  q("processmedia", "What signal does kill send by default?", ["KILL", "TERM", "STOP", "HUP"], 1, "kill sends TERM by default."),
  q("processmedia", "Which signal forces termination and cannot be caught or ignored?", ["TERM", "HUP", "KILL", "CONT"], 2, "KILL, often sent with -9, forces termination."),
  q("processmedia", "Which command starts a process with an adjusted nice value?", ["renice", "nice", "ps", "blkid"], 1, "nice starts a command with an adjusted priority."),
  q("processmedia", "Which command changes the nice value of an existing process?", ["renice", "nice", "tail", "mount"], 0, "renice changes priority for an existing process."),
  q("processmedia", "Which command lists block devices in a tree?", ["blkid", "lsblk", "dmesg", "df"], 1, "lsblk lists block devices and their relationships."),
  q("processmedia", "Which command safely detaches a mounted filesystem before removing media?", ["mount", "umount", "kill", "cat"], 1, "umount detaches a mounted filesystem."),
  q("selinux", "Which command reports SELinux mode as Enforcing, Permissive, or Disabled?", ["getenforce", "chmod", "firewall-cmd", "dnf info"], 0, "getenforce reports the current SELinux mode."),
  q("selinux", "What does SELinux permissive mode do?", ["Logs policy violations without denying them", "Deletes labels", "Blocks every network port", "Disables Unix permissions"], 0, "Permissive mode logs AVC messages but does not deny operations."),
  q("selinux", "Are setenforce changes persistent after reboot?", ["Yes", "No"], 1, "setenforce changes are temporary and revert after restart."),
  q("selinux", "Which command restores default SELinux file contexts?", ["restorecon", "groupadd", "dnf history", "lsblk"], 0, "restorecon restores default contexts from policy rules."),
  q("selinux", "In firewalld, what is a zone?", ["A trust/rule grouping for interfaces or sources", "A Vim mode", "An LVM logical volume", "A shell variable"], 0, "Zones separate traffic by trust level and rule set."),
  q("selinux", "Which command saves current runtime firewalld changes permanently?", ["firewall-cmd --runtime-to-permanent", "firewall-cmd --erase-runtime", "systemctl daemon-reload", "setenforce 1"], 0, "--runtime-to-permanent copies runtime firewall settings into permanent configuration."),
  q("exam", "A command fails: mkdir /jdoe/projects/webapp/src says No such file or directory. What is the best fix?", ["mkdir -p /jdoe/projects/webapp/src", "touch /jdoe/projects/webapp/src", "chmod +x /jdoe/projects/webapp/src", "passwd /jdoe"], 0, "The parent directories are missing, so use mkdir -p."),
  q("exam", "You must capture only errors from the previous command into errors.log. What do you run?", ["!! > errors.log", "!! 2> errors.log", "!! &> errors.log", "!! | errors.log"], 1, "stderr is FD 2, so 2> captures only errors."),
  q("exam", "You need to verify a user account without echo, an editor, or getent, and save it to ~/cit173. Which command fits?", ["grep user /etc/passwd > ~/cit173", "echo user > ~/cit173", "vim /etc/passwd > ~/cit173", "getent passwd user > ~/cit173"], 0, "The guide calls for grep against /etc/passwd with redirection."),
  q("exam", "A directory is owned by operator2:contractor3 and has drwxrwxr-x. operator1 is in neither group. Can operator1 delete files there?", ["Yes, because files decide deletion", "Yes, because other has r-x", "No, because deletion requires directory write permission", "Only if the file is world readable"], 2, "Deletion depends on write permission on the directory. other has r-x, no write."),
  q("exam", "contractor1 is not owner or group for a file. Which permission class applies?", ["User owner", "Group owner", "Other", "Root"], 2, "A user in neither owner nor group falls to other.")
];

const lessonUseCases = {
  "exam:0": {
    en: [
      "A question gives a situation, such as redirecting only errors or creating a nested path. First name the task, then choose the exact tool.",
      "A practical asks for proof from history. Think in command recipes: create, verify, redirect, then show history."
    ],
    es: [
      "Una pregunta da una situacion, como redirigir solo errores o crear una ruta anidada. Primero nombra la tarea, luego elige la herramienta exacta.",
      "Una practica pide evidencia del history. Piensa en recetas: crear, verificar, redirigir y luego mostrar history."
    ]
  },
  "exam:1": {
    en: [
      "A directory tree has several parent folders. Use mkdir -p instead of creating each level one at a time.",
      "A command asks you to append a user to a group without breaking existing membership. That is the -aG trap."
    ],
    es: [
      "Un arbol de directorios tiene varios folders padres. Usa mkdir -p en vez de crear cada nivel uno por uno.",
      "Un comando pide agregar un usuario a un grupo sin romper membresias existentes. Esa es la trampa de -aG."
    ]
  },
  "exam:2": {
    en: [
      "A lab asks for a screenshot of commands used. Use history after the work is done so the proof matches the actions.",
      "A task says not to use an editor, echo, or getent. That is a clue to use grep and redirection."
    ],
    es: [
      "Un lab pide screenshot de los comandos usados. Usa history al final para que la evidencia coincida con las acciones.",
      "Una tarea dice que no uses editor, echo o getent. Eso apunta a grep con redireccion."
    ]
  },
  "basics:0": {
    en: [
      "A lab says to open two terminals: one runs the command, the other observes or fixes it.",
      "A prompt changes from $ to #. That means your privilege level changed."
    ],
    es: [
      "Un lab dice abrir dos terminales: una ejecuta el comando, la otra observa o corrige.",
      "Un prompt cambia de $ a #. Eso significa que cambio tu nivel de privilegio."
    ]
  },
  "basics:1": {
    en: [
      "A question asks for the exact command, not keystrokes. Write only the command and options, such as man program or command -option.",
      "A tool behaves differently with one option. Identify the command, then the option, then the argument."
    ],
    es: [
      "Una pregunta pide el comando exacto, no teclas. Escribe solo el comando y opciones, como man programa o comando -opcion.",
      "Una herramienta cambia con una opcion. Identifica comando, opcion y argumento."
    ]
  },
  "basics:2": {
    en: [
      "A new command appears in a lab, like a terminal animation tool. Open its man page before guessing options.",
      "A command has too many flags to memorize. Use man -k or man command, then search inside the page."
    ],
    es: [
      "Aparece un comando nuevo en un lab, como una herramienta de animacion terminal. Abre su man page antes de adivinar opciones.",
      "Un comando tiene demasiadas flags para memorizar. Usa man -k o man comando y busca dentro de la pagina."
    ]
  },
  "filesystem:0": {
    en: [
      "A task names a starting folder and nested child folders. Draw the path before typing the mkdir command.",
      "A question compares / and /root. Remember that / is the whole tree; /root is only root's home."
    ],
    es: [
      "Una tarea nombra un folder inicial y subfolders anidados. Dibuja la ruta antes de escribir mkdir.",
      "Una pregunta compara / y /root. Recuerda que / es todo el arbol; /root es solo el home de root."
    ]
  },
  "filesystem:1": {
    en: [
      "A lab says to prove where you are before creating files. Use pwd and ls so the path is clear.",
      "A directory command fails because the parent is missing. Move to the right place or use an absolute path."
    ],
    es: [
      "Un lab pide probar donde estas antes de crear archivos. Usa pwd y ls para dejar clara la ruta.",
      "Un comando de directorio falla porque falta el padre. Muévete al lugar correcto o usa ruta absoluta."
    ]
  },
  "filesystem:2": {
    en: [
      "A practice asks you to create a file, copy it, rename it, try rmdir, then remove everything. That is touch, cp, mv, rmdir, then rm -r.",
      "A command mix-up asks for surprising behavior. cat on a directory errors; ls lists a directory; mv renames or moves instead of deleting."
    ],
    es: [
      "Una practica pide crear archivo, copiarlo, renombrarlo, probar rmdir y luego limpiar todo. Eso es touch, cp, mv, rmdir y rm -r.",
      "Un ejercicio mezcla comandos para resultados raros. cat sobre directorio da error; ls lista; mv renombra o mueve, no borra."
    ]
  },
  "permissions:0": {
    en: [
      "A user cannot delete in a shared directory even though files are readable. Check write permission on the directory.",
      "A question asks whether other users can access something. Read the third permission triplet."
    ],
    es: [
      "Un usuario no puede borrar en un directorio compartido aunque los archivos sean legibles. Revisa write en el directorio.",
      "Una pregunta pregunta si otros usuarios pueden acceder. Lee el tercer triplete de permisos."
    ]
  },
  "permissions:1": {
    en: [
      "A shared class folder should keep new files in the same group. Use SGID on the directory.",
      "A temporary shared folder should prevent users from deleting each other's files. Use sticky bit."
    ],
    es: [
      "Un folder compartido de clase debe mantener nuevos archivos en el mismo grupo. Usa SGID en el directorio.",
      "Un folder temporal compartido debe evitar que usuarios borren archivos de otros. Usa sticky bit."
    ]
  },
  "permissions:2": {
    en: [
      "A shortcut should break if the original path disappears. That is a symbolic link.",
      "Two filenames should keep the same data even if one name is removed. That is a hard link."
    ],
    es: [
      "Un acceso directo debe romperse si desaparece la ruta original. Eso es enlace simbolico.",
      "Dos nombres deben conservar los mismos datos aunque se borre uno. Eso es hard link."
    ]
  },
  "users:0": {
    en: [
      "A task asks you to redirect the last lines of /etc/passwd to a file. You are inspecting account records.",
      "A lab changes a user's shell field for practice. Know that the last /etc/passwd field is the login shell."
    ],
    es: [
      "Una tarea pide redirigir las ultimas lineas de /etc/passwd a un archivo. Estas inspeccionando cuentas.",
      "Un lab cambia el campo shell de un usuario para practicar. Recuerda que el ultimo campo de /etc/passwd es login shell."
    ]
  },
  "users:1": {
    en: [
      "A class task asks for several made-up users and groups. Use useradd, groupadd, and groupmod for the GID.",
      "A command must add multiple users to one group. Repeat usermod -aG group user for each account."
    ],
    es: [
      "Una tarea pide varios usuarios y grupos inventados. Usa useradd, groupadd y groupmod para el GID.",
      "Un comando debe agregar varios usuarios a un grupo. Repite usermod -aG grupo usuario para cada cuenta."
    ]
  },
  "users:2": {
    en: [
      "A lab says run one command as another account without switching sessions. Use sudo -u user command.",
      "A user needs admin rights through a group. Put the group rule in sudoers with the percent sign."
    ],
    es: [
      "Un lab dice ejecutar un comando como otra cuenta sin cambiar de sesion. Usa sudo -u usuario comando.",
      "Un usuario necesita derechos admin por grupo. Pon la regla de grupo en sudoers con signo de porcentaje."
    ]
  },
  "vimman:0": {
    en: [
      "A program option changes color, speed, or display. Use man program to discover the option, then run it.",
      "A terminal program cannot change the emulator font. If an option only works in the real console, explain that difference."
    ],
    es: [
      "Una opcion de programa cambia color, velocidad o display. Usa man programa para descubrir la opcion y ejecutarla.",
      "Un programa terminal no siempre puede cambiar la fuente del emulador. Si solo funciona en consola real, explica esa diferencia."
    ]
  },
  "vimman:1": {
    en: [
      "A task asks you to edit one field in a text file. Open it in Vim, move to the line, change text, write, and quit.",
      "A file has repeated text that must change everywhere. Use a Vim substitution instead of editing one by one."
    ],
    es: [
      "Una tarea pide editar un campo en un archivo de texto. Abre en Vim, ve a la linea, cambia texto, guarda y sal.",
      "Un archivo tiene texto repetido que debe cambiar en todas partes. Usa sustitucion de Vim en vez de editar uno por uno."
    ]
  },
  "vimman:2": {
    en: [
      "A question asks what an option does. Man pages show syntax in SYNOPSIS and details in OPTIONS.",
      "A command name appears in more than one section. Use man 5 or man 8 when the section matters."
    ],
    es: [
      "Una pregunta pide que hace una opcion. Las man pages muestran sintaxis en SYNOPSIS y detalles en OPTIONS.",
      "Un comando aparece en mas de una seccion. Usa man 5 o man 8 cuando la seccion importa."
    ]
  },
  "shell:0": {
    en: [
      "A fake command produces normal output and an error. Redirect stdout and stderr separately to prove you know the descriptors.",
      "A task says save only errors. Use 2> file because stderr is descriptor 2."
    ],
    es: [
      "Un comando falso produce salida normal y error. Redirige stdout y stderr por separado para probar que conoces los descriptores.",
      "Una tarea dice guardar solo errores. Usa 2> archivo porque stderr es descriptor 2."
    ]
  },
  "shell:1": {
    en: [
      "A task asks to save output and errors together. Use &> file or redirect stderr into stdout.",
      "A task says show output but discard errors. Send stderr to /dev/null while leaving stdout on screen."
    ],
    es: [
      "Una tarea pide guardar salida y errores juntos. Usa &> archivo o redirige stderr hacia stdout.",
      "Una tarea dice mostrar salida pero descartar errores. Envia stderr a /dev/null y deja stdout en pantalla."
    ]
  },
  "shell:2": {
    en: [
      "A lab asks for a variable that becomes an environment variable. Assign it, export it, then verify with env or printenv.",
      "A challenge forbids pipes but wants command output stored in a variable. Use command substitution like VAR=$(command)."
    ],
    es: [
      "Un lab pide una variable que se convierta en variable de entorno. Asignala, exportala y verifica con env o printenv.",
      "Un reto prohibe pipes pero quiere salida de comando en una variable. Usa sustitucion de comando como VAR=$(comando)."
    ]
  },
  "dnf:0": {
    en: [
      "A lab asks you to install a fun command-line package. On RHEL-style systems use dnf; on Debian-style systems the equivalent is apt.",
      "A package name is unknown. Search first, then install the exact package."
    ],
    es: [
      "Un lab pide instalar un paquete divertido de linea de comandos. En sistemas estilo RHEL usa dnf; en Debian el equivalente es apt.",
      "No conoces el nombre del paquete. Busca primero y luego instala el paquete exacto."
    ]
  },
  "dnf:1": {
    en: [
      "A tool is missing from the shell. Install it, confirm it runs, then use history to show the command sequence.",
      "A package causes clutter or is no longer needed. Remove it with the package manager."
    ],
    es: [
      "Falta una herramienta en el shell. Instalalo, confirma que corre y usa history para mostrar la secuencia.",
      "Un paquete ya no se necesita. Quitalo con el administrador de paquetes."
    ]
  },
  "dnf:2": {
    en: [
      "A system needs updates without a person typing dnf every time. Configure dnf-automatic and its timer.",
      "A question mentions scheduled package updates. Think systemd timer."
    ],
    es: [
      "Un sistema necesita actualizaciones sin que alguien escriba dnf cada vez. Configura dnf-automatic y su timer.",
      "Una pregunta menciona actualizaciones programadas de paquetes. Piensa en timer de systemd."
    ]
  },
  "systemd:0": {
    en: [
      "A service has custom startup behavior. Inspect the unit file and remember where admin overrides live.",
      "After editing a unit file, run daemon-reload before expecting systemd to see it."
    ],
    es: [
      "Un servicio tiene comportamiento personalizado al iniciar. Inspecciona el unit file y recuerda donde viven overrides admin.",
      "Despues de editar un unit file, ejecuta daemon-reload antes de esperar que systemd lo vea."
    ]
  },
  "systemd:1": {
    en: [
      "A service should work now and after reboot. Use systemctl enable --now service.",
      "A service config changed but the service can reload safely. Try reload before full restart when supported."
    ],
    es: [
      "Un servicio debe funcionar ahora y despues de reiniciar. Usa systemctl enable --now servicio.",
      "Cambio la configuracion de un servicio pero puede recargar seguro. Prueba reload antes de restart si lo soporta."
    ]
  },
  "systemd:2": {
    en: [
      "A VM should boot to text mode instead of graphical mode. Change the default target.",
      "A boot feels slow. Use systemd-analyze to see what took time."
    ],
    es: [
      "Una VM debe arrancar en modo texto en vez de modo grafico. Cambia el target predeterminado.",
      "Un arranque se siente lento. Usa systemd-analyze para ver que tardo."
    ]
  },
  "networking:0": {
    en: [
      "A network lab asks whether the profile or interface is wrong. Compare nmcli connection show with nmcli device status.",
      "A VM has multiple adapters. The connection profile is settings; the device is the actual interface."
    ],
    es: [
      "Un lab de red pregunta si falla el perfil o la interfaz. Compara nmcli connection show con nmcli device status.",
      "Una VM tiene varios adaptadores. El perfil es configuracion; el device es la interfaz real."
    ]
  },
  "networking:1": {
    en: [
      "A lab gives an IP, gateway, and DNS. That means configure a manual IPv4 profile.",
      "After changing a profile, bring it up again so the settings apply."
    ],
    es: [
      "Un lab da IP, gateway y DNS. Eso significa configurar un perfil IPv4 manual.",
      "Despues de cambiar un perfil, levantalo otra vez para aplicar la configuracion."
    ]
  },
  "networking:2": {
    en: [
      "A question says one physical network carries multiple logical networks. That points to VLANs.",
      "A virtualization host needs VMs on the network. That often points to a bridge."
    ],
    es: [
      "Una pregunta dice que una red fisica carga multiples redes logicas. Eso apunta a VLANs.",
      "Un host de virtualizacion necesita VMs en la red. Eso suele apuntar a bridge."
    ]
  },
  "security:0": {
    en: [
      "A lab asks you to block and then allow SSH access. Stop/disable sshd or change firewall rules, then test from the second terminal.",
      "A user can ping but cannot SSH. Check sshd status, firewall, route, address, and logs."
    ],
    es: [
      "Un lab pide bloquear y luego permitir SSH. Deten/deshabilita sshd o cambia firewall y prueba desde la segunda terminal.",
      "Un usuario puede hacer ping pero no SSH. Revisa sshd, firewall, ruta, direccion y logs."
    ]
  },
  "security:1": {
    en: [
      "A secure site or internal service has trust errors. Check certificates and the system trust store.",
      "A question mentions identity plus encryption. Think TLS."
    ],
    es: [
      "Un sitio seguro o servicio interno tiene errores de confianza. Revisa certificados y el trust store del sistema.",
      "Una pregunta menciona identidad mas cifrado. Piensa en TLS."
    ]
  },
  "security:2": {
    en: [
      "A service is running but remote clients cannot connect. Check firewall-cmd --list-all.",
      "A rule works now but disappears after reload. Make it permanent or save runtime to permanent."
    ],
    es: [
      "Un servicio esta corriendo pero clientes remotos no conectan. Revisa firewall-cmd --list-all.",
      "Una regla funciona ahora pero desaparece tras reload. Hazla permanente o guarda runtime a permanent."
    ]
  },
  "storage:0": {
    en: [
      "A removable drive appears as /dev/sdb1 and should be browsed under /mnt/usb. Mount the device to the directory.",
      "A mount should survive reboot. Put a UUID-based entry in /etc/fstab."
    ],
    es: [
      "Un drive removible aparece como /dev/sdb1 y debe verse en /mnt/usb. Monta el device en el directorio.",
      "Un montaje debe sobrevivir reinicio. Pon una entrada con UUID en /etc/fstab."
    ]
  },
  "storage:1": {
    en: [
      "A disk is local and needs a Linux filesystem. Choose XFS or ext4 depending on the environment.",
      "A share comes from another server. Think NFS or SMB instead of local filesystems."
    ],
    es: [
      "Un disco es local y necesita sistema de archivos Linux. Elige XFS o ext4 segun el entorno.",
      "Un share viene de otro servidor. Piensa en NFS o SMB, no filesystem local."
    ]
  },
  "storage:2": {
    en: [
      "A disk layout should grow later. Use LVM so storage can be managed through PV, VG, and LV layers.",
      "A question asks for the build order. Prepare PVs, create a VG, then create LVs."
    ],
    es: [
      "Un layout de disco debe crecer despues. Usa LVM para manejar storage con capas PV, VG y LV.",
      "Una pregunta pide el orden de construccion. Prepara PVs, crea VG y luego LVs."
    ]
  },
  "processmedia:0": {
    en: [
      "A screenshot shows file and cat examples. Use file to identify type, then cat only when the contents are short enough.",
      "A log is too long for cat. Use less to browse or tail -f to watch it update."
    ],
    es: [
      "Un screenshot muestra ejemplos de file y cat. Usa file para identificar tipo, luego cat solo si el contenido es corto.",
      "Un log es demasiado largo para cat. Usa less para navegar o tail -f para verlo actualizarse."
    ]
  },
  "processmedia:1": {
    en: [
      "A terminal is running yes and consuming CPU. Use top or ps from another terminal to find it.",
      "A process shows Z in ps output. It is a zombie waiting for its parent to collect status."
    ],
    es: [
      "Una terminal corre yes y consume CPU. Usa top o ps desde otra terminal para encontrarlo.",
      "Un proceso muestra Z en ps. Es zombie esperando que el parent recoja su estado."
    ]
  },
  "processmedia:2": {
    en: [
      "A runaway command will not stop normally. Try TERM first, then KILL only if needed.",
      "A CPU-heavy job should be less important than interactive work. Start it with nice or adjust with renice."
    ],
    es: [
      "Un comando fuera de control no se detiene normal. Prueba TERM primero, luego KILL solo si hace falta.",
      "Un trabajo pesado de CPU debe ser menos importante que trabajo interactivo. Inicialo con nice o ajusta con renice."
    ]
  },
  "processmedia:3": {
    en: [
      "A USB or extra virtual disk appears but you do not know the device name. Run lsblk and blkid.",
      "Before unplugging media, run umount so pending writes finish."
    ],
    es: [
      "Un USB o disco virtual extra aparece pero no sabes el nombre del device. Ejecuta lsblk y blkid.",
      "Antes de retirar medios, ejecuta umount para terminar escrituras pendientes."
    ]
  },
  "selinux:0": {
    en: [
      "A service works only when SELinux is permissive. That means policy or labels need troubleshooting.",
      "A mode change is only for testing. setenforce does not permanently change reboot behavior."
    ],
    es: [
      "Un servicio solo funciona cuando SELinux esta permissive. Eso significa que politica o etiquetas necesitan revision.",
      "Un cambio de modo es solo para probar. setenforce no cambia permanentemente el comportamiento tras reboot."
    ]
  },
  "selinux:1": {
    en: [
      "A web file has normal Unix permissions but the service still cannot read it. Check ls -Z and restore contexts.",
      "A custom content path should work after relabeling. Add a persistent fcontext rule, then restorecon."
    ],
    es: [
      "Un archivo web tiene permisos Unix normales pero el servicio no puede leerlo. Revisa ls -Z y restaura contextos.",
      "Una ruta personalizada debe funcionar despues de relabel. Agrega regla fcontext persistente y luego restorecon."
    ]
  },
  "selinux:2": {
    en: [
      "A port or service opens for testing but vanishes later. Runtime firewalld rules were not saved.",
      "A lab says allow SSH again. Add the service to the right zone and reload if using permanent rules."
    ],
    es: [
      "Un puerto o servicio abre para prueba pero desaparece despues. Las reglas runtime no se guardaron.",
      "Un lab dice permitir SSH otra vez. Agrega el servicio a la zona correcta y reload si usas reglas permanentes."
    ]
  }
};

const cramItems = [
  ["usermod -aG group user", "-aG appends a supplementary group. -G without -a replaces the list.", "-aG agrega un grupo suplementario. -G sin -a reemplaza la lista."],
  ["chmod 2775 dir", "Leading 2 sets SGID so new files can inherit the directory group.", "El 2 inicial activa SGID para que archivos nuevos puedan heredar el grupo del directorio."],
  ["chmod +t dir", "Sticky bit limits deletion in shared writable directories.", "Sticky bit limita borrado en directorios compartidos escribibles."],
  ["&> file", "Redirects both stdout and stderr to one file.", "Redirige stdout y stderr a un archivo."],
  ["!! 2> errors.log", "Runs the previous command again and captures only stderr.", "Ejecuta el comando anterior y captura solo stderr."],
  ["mkdir -p a/b/c", "Creates missing parent directories instead of failing.", "Crea directorios padre faltantes en vez de fallar."],
  ["grep user /etc/passwd > ~/cit173", "Verifies an account and writes the matching passwd line to a file.", "Verifica una cuenta y escribe la linea de passwd en un archivo."],
  ["%Admin ALL=(ALL) ALL", "Sudoers group rule for full sudo access.", "Regla de grupo en sudoers para acceso sudo completo."],
  ["systemctl enable --now sshd", "Starts the service now and enables it at boot.", "Inicia el servicio ahora y lo habilita al arranque."],
  ["firewall-cmd --runtime-to-permanent", "Saves current runtime firewalld rules permanently.", "Guarda permanentemente las reglas runtime actuales de firewalld."],
  ["restorecon -Rv path", "Restores default SELinux labels recursively and verbosely.", "Restaura etiquetas SELinux predeterminadas de forma recursiva y detallada."],
  ["UUID=... /data xfs defaults 0 0", "An /etc/fstab-style persistent mount entry.", "Entrada estilo /etc/fstab para un montaje persistente."]
];

const commandLabBank = [
  ["Create nested directories CSN/lasvegas in one command.", "mkdir -p CSN/lasvegas", "Crear directorios anidados CSN/lasvegas en un solo comando."],
  ["Append jdoe to Admin without removing existing groups.", "sudo usermod -aG Admin jdoe", "Agregar jdoe a Admin sin quitar grupos existentes."],
  ["Run touch as newuser without fully switching users.", "sudo -u newuser touch ~newuser/lasvegas/fakepassword.txt", "Ejecutar touch como newuser sin cambiar completamente de usuario."],
  ["Create bob1.txt through bob10.txt in MYWORK.", "touch ~/MYWORK/bob{1..10}.txt", "Crear bob1.txt hasta bob10.txt en MYWORK."],
  ["Save the FAKE variable into fakepassword.txt.", "echo $FAKE > ~/lasvegas/fakepassword.txt", "Guardar la variable FAKE en fakepassword.txt."],
  ["Capture only stderr from the last command.", "!! 2> errors.log", "Capturar solo stderr del comando anterior."],
  ["Grant the Admin group full sudo access in sudoers.", "%Admin ALL=(ALL) ALL", "Dar acceso sudo completo al grupo Admin en sudoers."],
  ["Start sshd now and enable it at boot.", "sudo systemctl enable --now sshd", "Iniciar sshd ahora y habilitarlo al arranque."],
  ["Make current firewalld runtime rules permanent.", "sudo firewall-cmd --runtime-to-permanent", "Hacer permanentes las reglas runtime actuales de firewalld."],
  ["Restore SELinux contexts under /var/www/html.", "sudo restorecon -Rv /var/www/html", "Restaurar contextos SELinux en /var/www/html."]
].map(([prompt, answer, promptEs]) => ({ prompt, answer, promptEs }));

const state = {
  screen: "home",
  topicId: "exam",
  lessonIndex: 0,
  quizIndex: 0,
  selected: null,
  answers: {},
  activeQuestions: [],
  quizMode: "topic",
  quizSourceTopic: "exam",
  flashCards: [],
  flashIndex: 0,
  flashFlipped: false,
  flashFilterTopic: "all",
  labIndex: 0,
  labRevealed: false,
  searchQuery: "",
  resultSaved: false,
  language: load("linux-language", "en"),
  bookmarked: load("linux-bookmarks", {}),
  flashSaved: load("linux-saved-flashcards", {})
};

const app = document.getElementById("app");

function q(topic, question, choices, answer, explanation) {
  return { id: `${topic}-${questionBankSafeId(question)}`, topic, question, choices, answer, explanation };
}

function questionBankSafeId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 54);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.terminal}</svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function topicById(id) {
  return localizedTopics().find((topic) => topic.id === id) || localizedTopics()[0];
}

function completedLessons() {
  return Object.keys(load("linux-complete", {})).length;
}

function totalLessons() {
  return topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
}

function t(key) {
  if (state.language !== "es") return key;
  return spanishPack.ui[key] || key;
}

function localizedTopics() {
  if (state.language !== "es") return topics;
  return topics.map((topic) => {
    const topicOverride = spanishPack.topics[topic.id] || {};
    return {
      ...topic,
      title: topicOverride.title || topic.title,
      lessons: topic.lessons.map((lesson, index) => ({
        ...lesson,
        ...(topicOverride.lessons?.[index] || {})
      }))
    };
  });
}

function localizedFlashCards() {
  if (state.language !== "es") return flashCardBank;
  return flashCardBank.map((card) => {
    const translated = spanishPack.flash[card.id];
    return translated ? { ...card, term: translated[0], definition: translated[1] } : card;
  });
}

function localizeQuestion(item) {
  if (state.language !== "es") return item;
  return {
    ...item,
    question: translateQuestionText(item.question),
    choices: item.choices.map(translateChoiceText),
    explanation: translateExplanationText(item.explanation)
  };
}

function localizedQuestionBank() {
  return questionBank.map(localizeQuestion);
}

function translateChoiceText(text) {
  const choices = {
    "True": "Verdadero",
    "False": "Falso",
    "The shell": "El shell",
    "The terminal": "La terminal",
    "The monitor": "El monitor",
    "The prompt": "El prompt",
    "Command": "Comando",
    "Option": "Opcion",
    "Argument": "Argumento",
    "Backslash": "Barra invertida",
    "Forward slash": "Barra diagonal",
    "Pipe": "Pipe",
    "Ampersand": "Ampersand",
    "Copies files": "Copia archivos",
    "Changes file ownership": "Cambia propiedad de archivos",
    "Starts a service": "Inicia un servicio",
    "Esc": "Esc",
    "Tab": "Tab",
    "Ctrl+C": "Ctrl+C",
    "User owner": "Usuario dueno",
    "Group owner": "Grupo dueno",
    "Other": "Otros",
    "Root only": "Solo root",
    "SUID": "SUID",
    "SGID": "SGID",
    "Sticky bit": "Sticky bit",
    "Setcap": "Setcap",
    "Symbolic link": "Enlace simbolico",
    "Hard link": "Hard link",
    "Soft link": "Soft link",
    "Device file": "Archivo de device",
    "Directory entry only": "Solo entrada de directorio",
    "Login shell": "Login shell",
    "Home directory": "Directorio home",
    "It deletes the user": "Borra el usuario",
    "It replaces supplementary groups without -a": "Reemplaza grupos suplementarios sin -a",
    "It changes UID to 0": "Cambia UID a 0",
    "It disables login": "Deshabilita login",
    "vim directly": "vim directamente",
    "nano directly": "nano directamente",
    "visudo": "visudo",
    "Admin ALL=(ALL) ALL": "Admin ALL=(ALL) ALL",
    "%Admin ALL=(ALL) ALL": "%Admin ALL=(ALL) ALL",
    "group Admin sudo": "group Admin sudo",
    "sudo Admin ALL": "sudo Admin ALL",
    "visual": "visual",
    "command": "command",
    "exit": "exit",
    "insert": "insert",
    "Yes": "Si",
    "No": "No",
    "Zombie": "Zombie",
    "Sleeping": "Sleeping",
    "Running": "Running",
    "Stopped": "Stopped",
    "Permissive": "Permisivo",
    "Zone": "Zona",
    "Encrypted network communication and identity validation": "Comunicacion de red cifrada y validacion de identidad",
    "Plain text log storage": "Almacenamiento de logs en texto plano",
    "Disk partitioning": "Particionamiento de disco",
    "Package installation": "Instalacion de paquetes",
    "The SSH server daemon": "El daemon del servidor SSH",
    "A text editor": "Un editor de texto",
    "A disk tool": "Una herramienta de disco",
    "The physical cable": "El cable fisico",
    "The firewall log": "El log del firewall",
    "A DNS record only": "Solo un registro DNS",
    "Encrypts SSH": "Cifra SSH",
    "Tags traffic for a logical network": "Etiqueta trafico para una red logica",
    "Deletes routes": "Borra rutas",
    "Creates users": "Crea usuarios",
    "A kernel module": "Un modulo del kernel",
    "A text UI for NetworkManager": "Una interfaz de texto para NetworkManager",
    "A package manager": "Un administrador de paquetes",
    "A password file": "Un archivo de contrasenas",
    "A grouped system state": "Un estado agrupado del sistema",
    "A package repository": "Un repositorio de paquetes",
    "A user password file": "Un archivo de contrasena de usuario",
    "A firewall zone only": "Solo una zona de firewall",
    "A saved network configuration": "Una configuracion de red guardada",
    "A trust/rule grouping for interfaces or sources": "Un grupo de confianza/reglas para interfaces o fuentes",
    "A Vim mode": "Un modo de Vim",
    "An LVM logical volume": "Un logical volume de LVM",
    "A shell variable": "Una variable de shell",
    "Logs policy violations without denying them": "Registra violaciones de politica sin denegarlas",
    "Deletes labels": "Borra etiquetas",
    "Blocks every network port": "Bloquea todos los puertos de red",
    "Disables Unix permissions": "Deshabilita permisos Unix",
    "A pool of space made from physical volumes": "Un conjunto de espacio hecho de volumenes fisicos",
    "A user group in /etc/group": "Un grupo de usuarios en /etc/group",
    "A firewall zone": "Una zona de firewall",
    "A systemd target": "Un target de systemd",
    "pvcreate, vgcreate, lvcreate": "pvcreate, vgcreate, lvcreate",
    "lvcreate, vgcreate, pvcreate": "lvcreate, vgcreate, pvcreate",
    "mkfs, passwd, chmod": "mkfs, passwd, chmod",
    "mount, ssh, dnf": "mount, ssh, dnf",
    "NFS and SMB": "NFS y SMB",
    "XFS": "XFS",
    "They are stable identifiers when device names change": "Son identificadores estables cuando cambian nombres de devices",
    "They replace passwords": "Reemplazan contrasenas",
    "They disable SELinux": "Deshabilitan SELinux",
    "They start services": "Inician servicios",
    "XFS and ext4": "XFS y ext4",
    "LVM and VDO": "LVM y VDO",
    "SUID and SGID": "SUID y SGID",
    "Only the username": "Solo el nombre de usuario",
    "sshd status, firewall, address, route, and logs": "estado de sshd, firewall, direccion, ruta y logs",
    "Only DNF history": "Solo DNF history",
    "Only Vim mode": "Solo modo Vim",
    "Yes, because files decide deletion": "Si, porque los archivos deciden el borrado",
    "Yes, because other has r-x": "Si, porque other tiene r-x",
    "No, because deletion requires directory write permission": "No, porque borrar requiere permiso write en el directorio",
    "Only if the file is world readable": "Solo si el archivo es legible por todos",
    "Root": "Root"
  };
  return choices[text] || text;
}

function translateQuestionText(text) {
  const exact = {
    "What interprets and executes commands typed at the command line?": "Que interpreta y ejecuta los comandos escritos en la linea de comandos?",
    "In ls -la /home, what is -la?": "En ls -la /home, que es -la?",
    "In ls -la /home, what is /home?": "En ls -la /home, que es /home?",
    "Which character lets you continue a long command onto the next line?": "Que caracter permite continuar un comando largo en la siguiente linea?",
    "Which key autocompletes commands and paths?": "Que tecla autocompleta comandos y rutas?",
    "Which directory contains regular users' home directories?": "Que directorio contiene los homes de usuarios regulares?",
    "Which directory holds most system configuration files?": "Que directorio contiene la mayoria de archivos de configuracion?",
    "Which command prints the absolute path of the current working directory?": "Que comando imprime la ruta absoluta del directorio actual?",
    "Which command creates nested directories in one command?": "Que comando crea directorios anidados en un solo comando?",
    "Which command checks free disk space?": "Que comando revisa espacio libre en disco?",
    "mv can move and rename files.": "mv puede mover y renombrar archivos.",
    "In rwxrwxr-x, who does the third permission triplet apply to?": "En rwxrwxr-x, a quien aplica el tercer triplete de permisos?",
    "What does chmod u+r file do?": "Que hace chmod u+r file?",
    "What does the leading 2 add in chmod 2775 dir?": "Que agrega el 2 inicial en chmod 2775 dir?",
    "Which special bit lets only the file owner delete files in a writable shared directory?": "Que bit especial permite que solo el dueno del archivo lo borre en un directorio compartido escribible?",
    "Which link type points to the same inode and increases the link count?": "Que tipo de enlace apunta al mismo inode y aumenta el contador de enlaces?",
    "A link that points to another file by name or path is a...": "Un enlace que apunta a otro archivo por nombre o ruta es...",
    "What is the UID of root?": "Cual es el UID de root?",
    "What is the last field of an /etc/passwd record?": "Cual es el ultimo campo de un registro /etc/passwd?",
    "Which command changes a user's password?": "Que comando cambia la contrasena de un usuario?",
    "Which command appends jdoe to Admin without removing other groups?": "Que comando agrega jdoe a Admin sin quitar otros grupos?",
    "Why is usermod -G Admin jdoe risky?": "Por que usermod -G Admin jdoe es riesgoso?",
    "Which tool should safely edit /etc/sudoers?": "Que herramienta debe editar /etc/sudoers de forma segura?",
    "Which sudoers line grants the Admin group full sudo?": "Que linea de sudoers da sudo completo al grupo Admin?",
    "Which is NOT a Vim mode?": "Cual NO es un modo de Vim?",
    "Which Vim command saves and quits?": "Que comando de Vim guarda y sale?",
    "Which Vim command deletes the current line?": "Que comando de Vim borra la linea actual?",
    "How many manual sections are there?": "Cuantas secciones tiene el manual?",
    "Which file descriptor is stderr?": "Que descriptor de archivo es stderr?",
    "What is the difference between > and >>?": "Cual es la diferencia entre > y >>?",
    "Which syntax redirects both stdout and stderr to a file?": "Que sintaxis redirige stdout y stderr a un archivo?",
    "Which syntax discards both stdout and stderr?": "Que sintaxis descarta stdout y stderr?",
    "What does a pipe do?": "Que hace un pipe?",
    "How do you make FAKE available to child processes?": "Como haces que FAKE este disponible para procesos hijos?",
    "Which tool manages RHEL software from RPM repositories?": "Que herramienta administra software RHEL desde repositorios RPM?",
    "Which command searches repositories for a package?": "Que comando busca un paquete en repositorios?",
    "Which command displays package details?": "Que comando muestra detalles de un paquete?",
    "Which command shows DNF transactions?": "Que comando muestra transacciones DNF?",
    "DNF automatic uses which systemd unit type for scheduled runs?": "DNF automatic usa que tipo de unidad systemd para ejecuciones programadas?",
    "Which command shows a service's current state?": "Que comando muestra el estado actual de un servicio?",
    "Which command starts a service now and enables it at boot?": "Que comando inicia un servicio ahora y lo habilita al arranque?",
    "After editing a unit file, which command reloads systemd's unit file state?": "Despues de editar un unit file, que comando recarga el estado de unidades de systemd?",
    "Administrator custom systemd units and overrides commonly live in...": "Las unidades systemd personalizadas y overrides del administrador normalmente viven en...",
    "What is a systemd target?": "Que es un target de systemd?",
    "Which command-line tool manages NetworkManager connections?": "Que herramienta de linea de comandos administra conexiones NetworkManager?",
    "What is nmtui?": "Que es nmtui?",
    "In NetworkManager, what is a connection profile?": "En NetworkManager, que es un perfil de conexion?",
    "What does a VLAN do?": "Que hace una VLAN?",
    "What does a bridge commonly do?": "Que hace comunmente un bridge?",
    "Which command is the OpenSSH client?": "Que comando es el cliente OpenSSH?",
    "What is sshd?": "Que es sshd?",
    "What does TLS mainly provide?": "Que proporciona principalmente TLS?",
    "Which command lists active firewalld settings?": "Que comando lista la configuracion activa de firewalld?",
    "For SSH access problems, what should you check?": "Para problemas de acceso SSH, que debes revisar?",
    "Which file stores persistent filesystem mounts?": "Que archivo guarda montajes persistentes?",
    "Why are UUIDs useful in /etc/fstab?": "Por que son utiles los UUID en /etc/fstab?",
    "Which RHEL local filesystem is the default?": "Cual sistema de archivos local es el predeterminado en RHEL?",
    "Which pair are network file systems?": "Cual par son sistemas de archivos de red?",
    "In LVM, what is a volume group?": "En LVM, que es un volume group?",
    "What is the usual LVM build order?": "Cual es el orden usual para crear LVM?",
    "Which command identifies a file's type by examining its contents?": "Que comando identifica el tipo de un archivo examinando su contenido?",
    "Which command is best for paging through a long text file?": "Que comando es mejor para navegar un archivo de texto largo?",
    "Which command follows new lines added to a growing log file?": "Que comando sigue lineas nuevas agregadas a un log que crece?",
    "Which command shows a snapshot of running processes?": "Que comando muestra un snapshot de procesos en ejecucion?",
    "Which command gives a live updating process view?": "Que comando da una vista en vivo de procesos?",
    "In process state letters, what does Z commonly mean?": "En letras de estado de procesos, que significa comunmente Z?",
    "What signal does kill send by default?": "Que signal envia kill por defecto?",
    "Which signal forces termination and cannot be caught or ignored?": "Que signal fuerza terminacion y no puede atraparse ni ignorarse?",
    "Which command starts a process with an adjusted nice value?": "Que comando inicia un proceso con un valor nice ajustado?",
    "Which command changes the nice value of an existing process?": "Que comando cambia el valor nice de un proceso existente?",
    "Which command lists block devices in a tree?": "Que comando lista block devices en forma de arbol?",
    "Which command safely detaches a mounted filesystem before removing media?": "Que comando desconecta de forma segura un sistema de archivos montado antes de retirar medios?",
    "Which command reports SELinux mode as Enforcing, Permissive, or Disabled?": "Que comando reporta el modo SELinux como Enforcing, Permissive o Disabled?",
    "What does SELinux permissive mode do?": "Que hace el modo permisivo de SELinux?",
    "Are setenforce changes persistent after reboot?": "Los cambios de setenforce persisten despues de reiniciar?",
    "Which command restores default SELinux file contexts?": "Que comando restaura contextos SELinux predeterminados?",
    "In firewalld, what is a zone?": "En firewalld, que es una zona?",
    "Which command saves current runtime firewalld changes permanently?": "Que comando guarda permanentemente los cambios runtime de firewalld?",
    "A command fails: mkdir /jdoe/projects/webapp/src says No such file or directory. What is the best fix?": "Un comando falla: mkdir /jdoe/projects/webapp/src dice No such file or directory. Cual es la mejor solucion?",
    "You must capture only errors from the previous command into errors.log. What do you run?": "Debes capturar solo errores del comando anterior en errors.log. Que ejecutas?",
    "You need to verify a user account without echo, an editor, or getent, and save it to ~/cit173. Which command fits?": "Necesitas verificar una cuenta de usuario sin echo, editor ni getent, y guardarla en ~/cit173. Que comando encaja?",
    "A directory is owned by operator2:contractor3 and has drwxrwxr-x. operator1 is in neither group. Can operator1 delete files there?": "Un directorio pertenece a operator2:contractor3 y tiene drwxrwxr-x. operator1 no esta en ninguno de esos grupos. Puede operator1 borrar archivos ahi?",
    "contractor1 is not owner or group for a file. Which permission class applies?": "contractor1 no es dueno ni grupo de un archivo. Que clase de permiso aplica?"
  };
  return exact[text] || text;
}

function translateExplanationText(text) {
  return text
    .replace("The shell interprets and executes commands. The terminal hosts the shell.", "El shell interpreta y ejecuta comandos. La terminal hospeda el shell.")
    .replace("-la modifies the ls command, so it is an option.", "-la modifica el comando ls, por eso es una opcion.")
    .replace("/home is the path the command acts on, so it is an argument.", "/home es la ruta sobre la que actua el comando, por eso es un argumento.")
    .replace("A trailing backslash continues the command on the next line.", "Una barra invertida al final continua el comando en la siguiente linea.")
    .replace("Tab autocompletes; Tab Tab lists possibilities.", "Tab autocompleta; Tab Tab lista posibilidades.")
    .replace("/etc/fstab stores mount entries that should persist across boots.", "/etc/fstab guarda entradas de montaje que deben persistir entre reinicios.")
    .replace("XFS is the default RHEL local filesystem.", "XFS es el sistema de archivos local predeterminado de RHEL.")
    .replace("NFS and SMB provide network file access.", "NFS y SMB proporcionan acceso a archivos por red.")
    .replace("file reports file type by inspecting contents and metadata.", "file reporta el tipo de archivo inspeccionando contenido y metadata.")
    .replace("less lets you scroll and search through long files.", "less permite desplazarte y buscar dentro de archivos largos.")
    .replace("tail -f follows appended log output.", "tail -f sigue la salida nueva agregada a un log.")
    .replace("ps shows a process snapshot.", "ps muestra un snapshot de procesos.")
    .replace("top displays an interactive live process view.", "top muestra una vista interactiva en vivo de procesos.")
    .replace("Z indicates a zombie process.", "Z indica un proceso zombie.")
    .replace("kill sends TERM by default.", "kill envia TERM por defecto.")
    .replace("KILL, often sent with -9, forces termination.", "KILL, frecuentemente enviado con -9, fuerza la terminacion.")
    .replace("nice starts a command with an adjusted priority.", "nice inicia un comando con prioridad ajustada.")
    .replace("renice changes priority for an existing process.", "renice cambia prioridad de un proceso existente.")
    .replace("lsblk lists block devices and their relationships.", "lsblk lista block devices y sus relaciones.")
    .replace("umount detaches a mounted filesystem.", "umount desconecta un sistema de archivos montado.")
    .replace("getenforce reports the current SELinux mode.", "getenforce reporta el modo SELinux actual.")
    .replace("Permissive mode logs AVC messages but does not deny operations.", "El modo permisivo registra mensajes AVC pero no deniega operaciones.")
    .replace("setenforce changes are temporary and revert after restart.", "Los cambios de setenforce son temporales y se revierten al reiniciar.")
    .replace("restorecon restores default contexts from policy rules.", "restorecon restaura contextos predeterminados desde las reglas de politica.")
    .replace("--runtime-to-permanent copies runtime firewall settings into permanent configuration.", "--runtime-to-permanent copia la configuracion runtime del firewall a la configuracion permanente.");
}

function finalHistory() {
  return load("linux-final-history", []);
}

function missedQuestionIds() {
  return load("linux-missed-question-ids", []);
}

function missedQuestions() {
  const ids = new Set(missedQuestionIds());
  return localizedQuestionBank().filter((question) => ids.has(question.id));
}

function updateMissNotebook(question, wasCorrect) {
  const ids = new Set(missedQuestionIds());
  if (wasCorrect) ids.delete(question.id);
  else ids.add(question.id);
  save("linux-missed-question-ids", [...ids]);
}

function examDateValue() {
  return load("linux-exam-date", "");
}

function daysUntilExam() {
  const value = examDateValue();
  if (!value) return null;
  const target = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / 86400000);
}

function render() {
  if (state.screen === "home") app.innerHTML = renderHome();
  if (state.screen === "topic") app.innerHTML = renderTopic();
  if (state.screen === "lesson") app.innerHTML = renderLesson();
  if (state.screen === "quiz") app.innerHTML = renderQuiz();
  if (state.screen === "flashcards") app.innerHTML = renderFlashCards();
  if (state.screen === "flashSubjects") app.innerHTML = renderFlashSubjects();
  if (state.screen === "search") app.innerHTML = renderSearch();
  if (state.screen === "cram") app.innerHTML = renderCramMode();
  if (state.screen === "commandLab") app.innerHTML = renderCommandLab();
  if (state.screen === "misses") app.innerHTML = renderMissesEmpty();
  if (state.screen === "sources") app.innerHTML = renderSources();
  wire();
}

function renderTopbar(title, left = "back", right = "info") {
  return `
    <header class="topbar">
      <button class="icon-button" data-action="${left}" aria-label="${left}">${icon(left === "back" ? "back" : left)}</button>
      <h1 class="title">${escapeHtml(title)}</h1>
      <button class="icon-button" data-action="${right}" aria-label="${right}">${icon(right)}</button>
    </header>
  `;
}

function renderLanguageToggle() {
  return `
    <div class="language-toggle" aria-label="Language">
      <button class="${state.language === "en" ? "active" : ""}" data-language="en">English</button>
      <span>/</span>
      <button class="${state.language === "es" ? "active" : ""}" data-language="es">Spanish</button>
    </div>
  `;
}

function renderHome() {
  const complete = completedLessons();
  const total = totalLessons();
  const readiness = Math.round((complete / total) * 100);
  const history = finalHistory();
  const best = history.length ? Math.max(...history.map((item) => item.score)) : 0;
  const savedCards = Object.keys(state.flashSaved).length;
  const weak = weakTopics();
  const missCount = missedQuestionIds().length;
  return `
    <main class="screen home-screen">
      ${renderTopbar(t("Work It Out: Linux"), "search", "info")}
      ${renderLanguageToggle()}
      <section class="home-hero">
        <h1>${escapeHtml(t("Work It Out: Linux"))}</h1>
      </section>
      <section class="hero-stat">
        ${statRing(`${readiness}%`, t("Lessons"), readiness)}
        ${statRing(`${best}%`, t("Best Final"), best)}
        ${statRing(savedCards, t("Saved Cards"), Math.min(100, savedCards * 8))}
      </section>
      <section class="study-dashboard">
        ${renderExamGoal()}
        <div class="readiness-card">
          <div>
            <span>${escapeHtml(t("Readiness"))}</span>
            <strong>${escapeHtml(t(readiness >= 80 ? "Looking polished" : readiness >= 45 ? "Getting close" : "Build the base"))}</strong>
            <small>${complete} ${escapeHtml(t("of"))} ${total} ${escapeHtml(t("lessons marked done. Final practice pulls from every topic."))}</small>
          </div>
          <button class="mini-action" data-action="startDailyDrill">${escapeHtml(t("Drill"))}</button>
        </div>
        <div class="weak-panel">
          <div class="section-heading"><h2>${escapeHtml(t("Weak Spots"))}</h2><span>${weak.length}</span></div>
          ${weak.length ? weak.map((item) => `<button class="weak-row" data-topic="${item.id}"><span>${escapeHtml(item.title)}</span><strong>${item.score}%</strong></button>`).join("") : `<p class="empty-note">${escapeHtml(t("Take a few quizzes and this panel will show where to focus."))}</p>`}
        </div>
      </section>
      ${renderBookmarks()}
      <section class="topic-grid">
        ${localizedTopics().map(renderTopicCard).join("")}
        <button class="topic-card" data-action="openCramMode"><span class="topic-icon">${icon("activity")}</span><span>${escapeHtml(t("Cram Mode"))}</span></button>
        <button class="topic-card" data-action="startMisses"><span class="topic-icon">${icon("notebook")}</span><span>${escapeHtml(t("My Misses"))}${missCount ? ` (${missCount})` : ""}</span></button>
        <button class="topic-card" data-action="openCommandLab"><span class="topic-icon">${icon("flask")}</span><span>${escapeHtml(t("Command Lab"))}</span></button>
        <button class="topic-card" data-action="startFlashCards"><span class="topic-icon">${icon("cards")}</span><span>${escapeHtml(t("Flash Cards"))}</span></button>
        <button class="topic-card" data-action="startFinalPractice"><span class="topic-icon">${icon("star")}</span><span>${escapeHtml(t("Final Practice"))}</span></button>
        <button class="topic-card" data-action="openSources"><span class="topic-icon">${icon("link")}</span><span>${escapeHtml(t("Legal Note"))}</span></button>
      </section>
    </main>
  `;
}

function renderExamGoal() {
  const date = examDateValue();
  const days = daysUntilExam();
  const dayText = days === null
    ? t("No date set yet.")
    : days === 0 ? t("Today") : `${Math.max(0, days)} ${t("days left")}`;
  return `
    <div class="goal-panel">
      <div>
        <span>${escapeHtml(t("Exam Goal"))}</span>
        <strong>${escapeHtml(dayText)}</strong>
        <small>${escapeHtml(t("Today's goal"))}: ${escapeHtml(t("10 flashcards + 1 topic quiz + review misses"))}</small>
      </div>
      <label class="date-control">
        <span>${escapeHtml(t("Exam date"))}</span>
        <input type="date" id="examDate" value="${escapeHtml(date)}">
      </label>
    </div>
  `;
}

function statRing(value, label, percent) {
  return `
    <div class="stat-card">
      <div class="stat-ring" style="--value:${Math.max(0, Math.min(100, Number(percent) || 0)) * 3.6}deg"><div class="stat-ring-inner"><strong>${escapeHtml(value)}</strong></div></div>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function weakTopics() {
  const stats = load("linux-topic-stats", {});
  return localizedTopics()
    .filter((topic) => topic.id !== "exam")
    .map((topic) => ({ id: topic.id, title: topic.title, score: stats[topic.id]?.total ? Math.round((stats[topic.id].correct / stats[topic.id].total) * 100) : 0, total: stats[topic.id]?.total || 0 }))
    .filter((item) => item.total > 0 && item.score < 80)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
}

function renderBookmarks() {
  const entries = Object.keys(state.bookmarked).map((key) => {
    const [topicId, lessonIndex] = key.split(":");
    const topic = topicById(topicId);
    const lesson = topic.lessons[Number(lessonIndex)];
    return lesson ? { topic, lesson, lessonIndex: Number(lessonIndex) } : null;
  }).filter(Boolean);
  if (!entries.length) return "";
  return `
    <section class="bookmark-panel">
      <div class="section-heading"><h2>${escapeHtml(t("Bookmarked"))}</h2><span>${entries.length}</span></div>
      <div class="bookmark-list">
        ${entries.map((item) => `
          <button class="bookmark-row" data-bookmark-topic="${item.topic.id}" data-bookmark-lesson="${item.lessonIndex}">
            <span class="bookmark-star">${icon("star")}</span>
            <span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small></span>
            <span class="chevron">›</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTopicCard(topic) {
  return `<button class="topic-card" data-topic="${topic.id}"><span class="topic-icon">${icon(topic.icon)}</span><span>${escapeHtml(topic.title)}</span></button>`;
}

function renderTopic() {
  const topic = topicById(state.topicId);
  return `
    <main class="screen topic-screen">
      ${renderTopbar(topic.title, "back", "search")}
      <section class="list">
        ${topic.lessons.map((lesson, index) => `
          <button class="lesson-row" data-lesson="${index}">
            <span class="mini-icon">${icon(topic.icon)}</span>
            <span><strong>${escapeHtml(lesson.title)}</strong><small>${topic.id === "exam" ? escapeHtml(t("Final strategy")) : `${escapeHtml(t("Lesson"))} ${index + 1}`}</small></span>
            <span class="chevron">›</span>
          </button>
        `).join("")}
      </section>
      <nav class="bottom-nav">
        <button class="icon-button" data-action="back">${icon("back")}</button>
        <button class="pill-button secondary" data-action="startFlashCards">${escapeHtml(t("Cards"))}</button>
        <button class="pill-button" data-action="topicQuiz">${escapeHtml(t(topic.id === "exam" ? "Final Practice" : "Topic Quiz"))}</button>
        <button class="icon-button" data-action="topicQuiz">${icon("next")}</button>
      </nav>
    </main>
  `;
}

function renderLesson() {
  const topic = topicById(state.topicId);
  const lesson = topic.lessons[state.lessonIndex];
  const key = `${state.topicId}:${state.lessonIndex}`;
  return `
    <main class="screen lesson-screen">
      ${renderTopbar(topic.title, "back", state.bookmarked[key] ? "star" : "star")}
      ${dots(topic.lessons.length, state.lessonIndex)}
      <article class="reader" data-swipe="lesson">
        <div class="reader-card">
          <h2>${escapeHtml(lesson.title)}</h2>
          ${(lesson.body || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          ${(lesson.commands || []).map((cmd) => `<pre class="code-strip"><code>${escapeHtml(cmd)}</code></pre>`).join("")}
          ${renderLessonUseCases(topic.id, state.lessonIndex)}
          ${lesson.remember ? `<div class="memory-box"><strong>${escapeHtml(t("Remember"))}:</strong> ${escapeHtml(lesson.remember)}</div>` : ""}
        </div>
      </article>
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevLesson">${icon("back")}</button>
        <button class="pill-button secondary" data-action="markDone">${escapeHtml(t("Done"))}</button>
        <button class="pill-button" data-action="nextLesson">${escapeHtml(t(state.lessonIndex === topic.lessons.length - 1 ? "Quiz Me" : "Next"))}</button>
        <button class="icon-button" data-action="nextLesson">${icon("next")}</button>
      </nav>
    </main>
  `;
}

function renderLessonUseCases(topicId, lessonIndex) {
  const item = lessonUseCases[`${topicId}:${lessonIndex}`];
  if (!item) return "";
  const examples = state.language === "es" ? item.es : item.en;
  return `
    <section class="use-case-box">
      <h3>${escapeHtml(t("Use it when"))}</h3>
      <ul>
        ${examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderQuiz() {
  const current = currentQuestion();
  if (!current) return renderQuizScore();
  const answered = state.answers[current.id];
  const progress = ((state.quizIndex + 1) / state.activeQuestions.length) * 100;
  return `
    <main class="screen quiz-screen">
      ${renderTopbar(quizTitle(), "back", "search")}
      <section class="quiz-card" data-swipe="quiz">
        <div class="quiz-panel">
          <div class="quiz-status"><span>${escapeHtml(t("Question"))} ${state.quizIndex + 1} ${escapeHtml(t("of"))} ${state.activeQuestions.length}</span><span>${escapeHtml(topicById(current.topic).title)}</span></div>
          <div class="quiz-meter"><span style="width:${progress}%"></span></div>
          <p class="question">${escapeHtml(current.question)}</p>
          <div class="answer-list">
            ${current.choices.map((choice, index) => {
              const klass = answerClass(index, current, answered);
              return `<button class="answer ${klass}" data-answer="${index}">
                <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                <span class="answer-text">${escapeHtml(choice)}</span>
              </button>`;
            }).join("")}
          </div>
          ${answered ? `<div class="feedback"><strong>${escapeHtml(t(answered.correct ? "Correct." : "Not quite."))}</strong> ${escapeHtml(current.explanation)}${renderChoiceBreakdown(current)}</div>` : ""}
        </div>
      </section>
      <nav class="quiz-actions">
        <button class="quiz-nav-button" data-action="prevQuestion">${icon("back")}</button>
        <button class="quiz-ghost" data-action="showAnswer">${escapeHtml(t("Show"))}</button>
        <button class="quiz-primary ${answered ? (answered.correct ? "correct" : "wrong") : ""}" data-action="${answered ? "nextQuestion" : "check"}">${escapeHtml(t(answered ? "Next" : "Check"))}</button>
        <button class="quiz-nav-button" data-action="nextQuestion">${icon("next")}</button>
      </nav>
    </main>
  `;
}

function answerClass(index, question, answered) {
  if (!answered) return state.selected === index ? "selected" : "";
  if (index === question.answer) return "correct";
  if (index === answered.selected) return "wrong";
  return "";
}

function renderChoiceBreakdown(question) {
  return `
    <div class="choice-breakdown">
      <strong>${escapeHtml(t("Answer breakdown"))}</strong>
      ${question.choices.map((choice, index) => `
        <p class="${index === question.answer ? "right" : ""}">
          <span>${String.fromCharCode(65 + index)}.</span>
          ${escapeHtml(index === question.answer ? `${t("Correct")}: ${question.explanation}` : `${choice} ${t("does not match the main requirement in this question.")}`)}
        </p>
      `).join("")}
    </div>
  `;
}

function renderQuizScore() {
  const correct = state.activeQuestions.filter((item) => state.answers[item.id]?.correct).length;
  const total = state.activeQuestions.length;
  const score = total ? Math.round((correct / total) * 100) : 0;
  if (!state.resultSaved && total) recordQuizResult(correct);
  const missed = state.activeQuestions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  return `
    <main class="screen">
      ${renderTopbar(t("Quiz Results"), "back", "search")}
      <section class="score-card">
        <span>${escapeHtml(t("Score"))}</span>
        <div class="score">${score}%</div>
        <p>${correct} ${escapeHtml(t("correct out of"))} ${total}. ${escapeHtml(t(score >= 80 ? "That is solid exam energy." : "Review the missed questions, then run another drill."))}</p>
        ${missed.length ? `<button class="pill-button" data-action="reviewMissed">${escapeHtml(t("Review Missed"))} (${missed.length})</button>` : ""}
        <button class="pill-button secondary" data-action="restartQuiz">${escapeHtml(t("Try Again"))}</button>
        <button class="pill-button secondary" data-action="home">${escapeHtml(t("Home"))}</button>
      </section>
    </main>
  `;
}

function quizTitle() {
  if (state.quizMode === "final") return t("Work it Out Final");
  if (state.quizMode === "daily") return t("Daily Quick Drill");
  if (state.quizMode === "review") return t("Missed Questions");
  return `${topicById(state.topicId).title} ${state.language === "es" ? "Quiz" : "Quiz"}`;
}

function recordQuizResult(correct) {
  const stats = load("linux-topic-stats", {});
  state.activeQuestions.forEach((question) => {
    if (!stats[question.topic]) stats[question.topic] = { correct: 0, total: 0 };
    stats[question.topic].total += 1;
    if (state.answers[question.id]?.correct) stats[question.topic].correct += 1;
  });
  save("linux-topic-stats", stats);
  if (state.quizMode === "final") {
    const history = finalHistory();
    history.push({ score: Math.round((correct / state.activeQuestions.length) * 100), date: new Date().toISOString() });
    save("linux-final-history", history.slice(-10));
  }
  state.resultSaved = true;
}

function renderFlashCards() {
  const cards = state.flashCards.length ? state.flashCards : localizedFlashCards();
  const card = cards[state.flashIndex] || cards[0];
  const saved = card && state.flashSaved[card.id];
  return `
    <main class="screen flash-screen">
      ${renderTopbar(t("Flash Cards"), "back", "search")}
      <div class="flash-meta"><span>${escapeHtml(flashSubjectTitle(state.flashFilterTopic))}</span><span>${state.flashIndex + 1} / ${cards.length}</span></div>
      <div class="flash-tools">
        <button class="flash-tool" data-action="chooseFlashSubject">${escapeHtml(t("Topics"))}</button>
        <button class="flash-tool ${saved ? "saved" : ""}" data-action="saveFlashCard">${escapeHtml(t(saved ? "Saved" : "Save"))}</button>
        <button class="flash-tool" data-action="shuffleFlashCards">${escapeHtml(t("Shuffle"))}</button>
      </div>
      <section class="flash-card ${state.flashFlipped ? "flipped" : ""}" data-action="flipFlashCard" data-swipe="flashcards">
        <span class="flash-label">${escapeHtml(t(state.flashFlipped ? "Answer" : "Prompt"))}</span>
        <strong>${escapeHtml(state.flashFlipped ? card.definition : card.term)}</strong>
        <small>${escapeHtml(topicById(card.topic).title)}</small>
      </section>
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevFlashCard">${icon("back")}</button>
        <button class="pill-button secondary" data-action="openFlashTopic">${escapeHtml(t("Topic"))}</button>
        <button class="pill-button" data-action="flipFlashCard">${escapeHtml(t("Flip"))}</button>
        <button class="icon-button" data-action="nextFlashCard">${icon("next")}</button>
      </nav>
    </main>
  `;
}

function renderFlashSubjects() {
  const subjects = flashSubjects();
  return `
    <main class="screen topic-screen">
      ${renderTopbar(t("Card Topics"), "back", "search")}
      <section class="list">
        ${subjects.map((subject) => `
          <button class="lesson-row flash-subject-row" data-flash-topic="${subject.id}">
            <span class="mini-icon">${icon(subject.icon)}</span>
            <span><strong>${escapeHtml(subject.title)}</strong><small>${subject.count} ${escapeHtml(t("cards"))}</small></span>
            <span class="subject-count">${subject.count}</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderSearch() {
  return `
    <main class="screen">
      ${renderTopbar(t("Search"), "back", "info")}
      <section class="search-panel">
        <input id="searchBox" class="search-input" value="${escapeHtml(state.searchQuery)}" placeholder="${escapeHtml(t("Search commands, files, topics..."))}" autocomplete="off">
        <div class="search-results">${renderSearchResults(state.searchQuery)}</div>
      </section>
    </main>
  `;
}

function renderSearchResults(query) {
  const results = searchItems(query);
  if (!query.trim()) return `<p class="empty-note">${escapeHtml(t("Try sudoers, sticky, nmcli, dnf, systemctl, /etc/passwd, or stderr."))}</p>`;
  if (!results.length) return `<p class="empty-note">${escapeHtml(t("No matches yet. Try a shorter command or topic word."))}</p>`;
  return results.map((item) => {
    if (item.kind === "lesson") {
      return `<button class="search-row" data-search-topic="${item.topic.id}" data-search-lesson="${item.lessonIndex}">
        <span>${escapeHtml(t("Lesson"))}</span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small>
      </button>`;
    }
    return `<button class="search-row" data-search-card="${item.card.id}">
      <span>${escapeHtml(t("Flash Cards")).replace(/s$/, "")}</span><strong>${escapeHtml(item.card.term)}</strong><small>${escapeHtml(topicById(item.card.topic).title)}</small>
    </button>`;
  }).join("");
}

function renderCramMode() {
  return `
    <main class="screen">
      ${renderTopbar(t("Cram Mode"), "back", "search")}
      <section class="reader-card utility-card">
        <h2>${escapeHtml(t("High-yield command traps"))}</h2>
        <div class="cram-list">
          ${cramItems.map(([command, english, spanish]) => `
            <div class="cram-item">
              <pre class="code-strip"><code>${escapeHtml(command)}</code></pre>
              <p>${escapeHtml(state.language === "es" ? spanish : english)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderCommandLab() {
  const item = commandLabBank[state.labIndex] || commandLabBank[0];
  return `
    <main class="screen">
      ${renderTopbar(t("Command Lab"), "back", "search")}
      <section class="flash-card command-lab-card">
        <span class="flash-label">${state.labIndex + 1} / ${commandLabBank.length}</span>
        <strong>${escapeHtml(state.language === "es" ? item.promptEs : item.prompt)}</strong>
        <small>${escapeHtml(t("Practice the exact command shape. Read the task, reveal the command, then move to the next prompt."))}</small>
        ${state.labRevealed ? `<pre class="code-strip"><code>${escapeHtml(item.answer)}</code></pre>` : ""}
      </section>
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevLab">${icon("back")}</button>
        <button class="pill-button secondary" data-action="toggleLabAnswer">${escapeHtml(t(state.labRevealed ? "Hide" : "Reveal"))}</button>
        <button class="pill-button" data-action="nextLab">${escapeHtml(t("Next"))}</button>
        <button class="icon-button" data-action="nextLab">${icon("next")}</button>
      </nav>
    </main>
  `;
}

function renderMissesEmpty() {
  return `
    <main class="screen">
      ${renderTopbar(t("My Misses"), "back", "search")}
      <section class="score-card">
        <span>${escapeHtml(t("My Misses"))}</span>
        <div class="score">0</div>
        <p>${escapeHtml(t("Missed questions will collect here after quizzes."))}</p>
        <button class="pill-button" data-action="startDailyDrill">${escapeHtml(t("Drill"))}</button>
      </section>
    </main>
  `;
}

function renderSources() {
  const sources = [
    [t("Trademark note"), t("Linux is a registered trademark of Linus Torvalds in the U.S. and other countries. This app is not affiliated with or endorsed by Linus Torvalds or The Linux Foundation.")]
  ];
  return `
    <main class="screen">
      ${renderTopbar(t("Legal Note"), "back", "info")}
      <section class="reader-card utility-card">
        <h2>${escapeHtml(t("Source Notes"))}</h2>
        <div class="source-list">
          ${sources.map(([name, note]) => `
            <div class="source-row">
              <strong>${escapeHtml(name)}</strong>
              <p>${escapeHtml(note)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function dots(total, active) {
  return `<div class="progress-strip">${Array.from({ length: total }, (_, index) => `<span class="progress-dot ${index === active ? "active" : ""}"></span>`).join("")}</div>`;
}

function startQuiz(topicId, options = {}) {
  state.screen = "quiz";
  state.topicId = topicId;
  state.quizSourceTopic = options.sourceTopic || topicId;
  state.quizMode = options.mode || (topicId === "exam" ? "final" : "topic");
  state.quizIndex = 0;
  state.selected = null;
  state.answers = {};
  state.resultSaved = false;
  const source = options.questions || pickQuizSource(topicId, options);
  state.activeQuestions = source.map(randomizeQuestion);
  if (!options.questions) rememberQuizQuestions(quizHistoryKey(topicId, options), source);
  render();
}

function startDailyDrill() {
  startQuiz("daily", {
    mode: "daily",
    sourceTopic: "daily",
    questions: shuffle(localizedQuestionBank()).slice(0, 7)
  });
}

function startReviewMissed() {
  const missed = state.activeQuestions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  if (missed.length) startQuiz("review", { mode: "review", sourceTopic: state.quizSourceTopic, questions: missed });
}

function startMissNotebook() {
  const missed = missedQuestions();
  if (!missed.length) {
    state.screen = "misses";
    return render();
  }
  startQuiz("misses", {
    mode: "review",
    sourceTopic: "misses",
    questions: missed
  });
}

function pickQuizSource(topicId, options = {}) {
  if (topicId === "final") return balancedFinalQuestions();
  if (topicId === "misses") return missedQuestions();
  const bank = localizedQuestionBank();
  if (topicId === "daily") return shuffle(bank).slice(0, 7);
  const pool = topicId === "exam" ? bank : bank.filter((item) => item.topic === topicId);
  return freshQuizPick(pool, Math.min(topicId === "exam" ? 45 : 8, pool.length), quizHistoryKey(topicId, options));
}

function balancedFinalQuestions() {
  const buckets = [
    ["basics", "filesystem", "permissions", "users", "vimman", "shell"],
    ["dnf", "systemd", "networking", "security", "storage", "processmedia", "selinux"],
    ["exam"]
  ];
  const picked = [
    ...pickFromTopics(buckets[0], 22),
    ...pickFromTopics(buckets[1], 15),
    ...pickFromTopics(buckets[2], 8)
  ];
  const seen = new Set(picked.map((item) => item.id));
  const fill = shuffle(localizedQuestionBank().filter((item) => !seen.has(item.id))).slice(0, 45 - picked.length);
  return shuffle([...picked, ...fill]).slice(0, 45);
}

function pickFromTopics(topicIds, count) {
  return shuffle(localizedQuestionBank().filter((item) => topicIds.includes(item.topic))).slice(0, count);
}

function quizHistoryKey(topicId, options = {}) {
  return `linux-quiz-history-${options.sourceTopic || topicId}-${options.mode || "topic"}-${state.language}`;
}

function freshQuizPick(pool, count, key) {
  const recent = new Set(load(key, []));
  const fresh = pool.filter((item) => !recent.has(item.id));
  const firstPass = shuffle(fresh).slice(0, count);
  if (firstPass.length >= count) return firstPass;
  const used = new Set(firstPass.map((item) => item.id));
  const refill = shuffle(pool.filter((item) => !used.has(item.id))).slice(0, count - firstPass.length);
  return [...firstPass, ...refill];
}

function rememberQuizQuestions(key, questions) {
  const prior = load(key, []);
  const next = [...questions.map((item) => item.id), ...prior].filter(Boolean);
  save(key, [...new Set(next)].slice(0, 18));
}

function randomizeQuestion(item) {
  if (item.choices.length === 2 && item.choices.includes("True") && item.choices.includes("False")) return { ...item };
  const choices = item.choices.map((text, index) => ({ text, correct: index === item.answer }));
  const shuffled = shuffle(choices);
  return { ...item, choices: shuffled.map((choice) => choice.text), answer: shuffled.findIndex((choice) => choice.correct) };
}

function startFlashCards(topicId = "all") {
  const cards = localizedFlashCards();
  const source = topicId === "saved"
    ? cards.filter((card) => state.flashSaved[card.id])
    : topicId === "all" ? cards : cards.filter((card) => card.topic === topicId);
  state.screen = "flashcards";
  state.flashCards = shuffle(source.length ? source : cards);
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.flashFilterTopic = topicId;
  render();
}

function flashSubjects() {
  const cards = localizedFlashCards();
  const subjects = [{ id: "all", title: t("All Flash Cards"), icon: "cards", count: cards.length }];
  const savedCount = cards.filter((card) => state.flashSaved[card.id]).length;
  if (savedCount) subjects.push({ id: "saved", title: t("Saved Flash Cards"), icon: "star", count: savedCount });
  localizedTopics().filter((topic) => topic.id !== "exam").forEach((topic) => {
    const count = cards.filter((card) => card.topic === topic.id).length;
    if (count) subjects.push({ id: topic.id, title: topic.title, icon: topic.icon, count });
  });
  return subjects;
}

function flashSubjectTitle(topicId) {
  if (topicId === "all") return t("All subjects");
  if (topicId === "saved") return t("Saved cards");
  return topicById(topicId).title;
}

function searchItems(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  localizedTopics().forEach((topic) => {
    topic.lessons.forEach((lesson, lessonIndex) => {
      const haystack = [lesson.title, ...(lesson.body || []), ...(lesson.commands || []), lesson.remember || "", topic.title].join(" ").toLowerCase();
      if (haystack.includes(needle)) results.push({ kind: "lesson", topic, lesson, lessonIndex });
    });
  });
  localizedFlashCards().forEach((card) => {
    const haystack = `${card.term} ${card.definition} ${topicById(card.topic).title}`.toLowerCase();
    if (haystack.includes(needle)) results.push({ kind: "flash", card });
  });
  return results.slice(0, 24);
}

function currentQuestion() {
  return state.activeQuestions[state.quizIndex];
}

function markDone() {
  const complete = load("linux-complete", {});
  complete[`${state.topicId}:${state.lessonIndex}`] = true;
  save("linux-complete", complete);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function wire() {
  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "topic";
      state.topicId = button.dataset.topic;
      render();
    });
  });
  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.lessonIndex = Number(button.dataset.lesson);
      render();
    });
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = currentQuestion();
      if (!current || state.answers[current.id]) return;
      state.selected = Number(button.dataset.answer);
      render();
    });
  });
  document.querySelectorAll("[data-flash-topic]").forEach((button) => {
    button.addEventListener("click", () => startFlashCards(button.dataset.flashTopic));
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      save("linux-language", state.language);
      state.flashCards = [];
      state.flashIndex = 0;
      state.flashFlipped = false;
      render();
    });
  });
  document.querySelectorAll("[data-bookmark-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.bookmarkTopic;
      state.lessonIndex = Number(button.dataset.bookmarkLesson);
      render();
    });
  });
  document.querySelectorAll("[data-search-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.searchTopic;
      state.lessonIndex = Number(button.dataset.searchLesson);
      render();
    });
  });
  document.querySelectorAll("[data-search-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = localizedFlashCards().find((item) => item.id === button.dataset.searchCard);
      if (!card) return;
      state.screen = "flashcards";
      state.flashCards = [card];
      state.flashIndex = 0;
      state.flashFlipped = false;
      state.flashFilterTopic = card.topic;
      render();
    });
  });
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.focus();
    searchBox.addEventListener("input", () => {
      state.searchQuery = searchBox.value;
      const results = document.querySelector(".search-results");
      if (results) results.innerHTML = renderSearchResults(state.searchQuery);
      wire();
    });
  }
  const examDate = document.getElementById("examDate");
  if (examDate) {
    examDate.addEventListener("change", () => {
      save("linux-exam-date", examDate.value);
      render();
    });
  }
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => act(button.dataset.action));
  });
  document.querySelectorAll("[data-swipe]").forEach(addSwipe);
}

function act(action) {
  if (action === "back") return back();
  if (action === "info") return alert(t("Swipe left or right on lesson, quiz, and flash card screens. Progress stays on this device."));
  if (action === "home") {
    state.screen = "home";
    return render();
  }
  if (action === "search" || action === "openSearch") {
    state.screen = "search";
    state.searchQuery = "";
    return render();
  }
  if (action === "star") return toggleBookmark();
  if (action === "startDailyDrill") return startDailyDrill();
  if (action === "startFinalPractice") return startQuiz("final", { mode: "final", sourceTopic: "final" });
  if (action === "startFlashCards") return startFlashCards();
  if (action === "openCramMode") {
    state.screen = "cram";
    return render();
  }
  if (action === "openCommandLab") {
    state.screen = "commandLab";
    state.labIndex = 0;
    state.labRevealed = false;
    return render();
  }
  if (action === "openSources") {
    state.screen = "sources";
    return render();
  }
  if (action === "startMisses") return startMissNotebook();
  if (action === "chooseFlashSubject") {
    state.screen = "flashSubjects";
    return render();
  }
  if (action === "openFlashTopic") return openFlashTopic();
  if (action === "flipFlashCard") return flipFlashCard();
  if (action === "saveFlashCard") return toggleSaveFlashCard();
  if (action === "shuffleFlashCards") return startFlashCards(state.flashFilterTopic);
  if (action === "prevFlashCard") return moveFlashCard(-1);
  if (action === "nextFlashCard") return moveFlashCard(1);
  if (action === "topicQuiz") return startQuiz(state.topicId === "exam" ? "final" : state.topicId, state.topicId === "exam" ? { mode: "final", sourceTopic: "exam" } : {});
  if (action === "prevLesson") return moveLesson(-1);
  if (action === "nextLesson") return moveLesson(1);
  if (action === "markDone") {
    markDone();
    return moveLesson(1);
  }
  if (action === "check") return checkAnswer();
  if (action === "showAnswer") return showAnswer();
  if (action === "prevQuestion") return moveQuestion(-1);
  if (action === "nextQuestion") return moveQuestion(1);
  if (action === "toggleLabAnswer") {
    state.labRevealed = !state.labRevealed;
    return render();
  }
  if (action === "prevLab") return moveLab(-1);
  if (action === "nextLab") return moveLab(1);
  if (action === "reviewMissed") return startReviewMissed();
  if (action === "restartQuiz") {
    if (state.quizMode === "daily") return startDailyDrill();
    if (state.quizSourceTopic === "misses") return startMissNotebook();
    if (state.quizMode === "review") return startQuiz(state.quizSourceTopic || "final");
    return startQuiz(state.quizSourceTopic || state.topicId, { mode: state.quizMode });
  }
}

function back() {
  if (state.screen === "topic") state.screen = "home";
  else if (state.screen === "lesson") state.screen = "topic";
  else if (state.screen === "quiz") state.screen = ["final", "daily", "review"].includes(state.quizMode) ? "home" : "topic";
  else if (state.screen === "flashSubjects") state.screen = "flashcards";
  else if (["cram", "commandLab", "misses", "sources"].includes(state.screen)) state.screen = "home";
  else state.screen = "home";
  render();
}

function toggleBookmark() {
  if (state.screen !== "lesson") return;
  const key = `${state.topicId}:${state.lessonIndex}`;
  if (state.bookmarked[key]) delete state.bookmarked[key];
  else state.bookmarked[key] = true;
  save("linux-bookmarks", state.bookmarked);
  render();
}

function moveLesson(delta) {
  const topic = topicById(state.topicId);
  const next = state.lessonIndex + delta;
  if (next < 0) state.screen = "topic";
  else if (next >= topic.lessons.length) return startQuiz(state.topicId === "exam" ? "final" : state.topicId, state.topicId === "exam" ? { mode: "final", sourceTopic: "exam" } : {});
  else state.lessonIndex = next;
  render();
}

function checkAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id] || state.selected === null) return;
  const correct = state.selected === current.answer;
  state.answers[current.id] = { selected: state.selected, correct };
  updateMissNotebook(current, correct);
  render();
}

function showAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id]) return;
  state.selected = current.answer;
  state.answers[current.id] = { selected: current.answer, correct: true };
  render();
}

function moveQuestion(delta) {
  const next = state.quizIndex + delta;
  if (next < 0) return;
  state.quizIndex = next;
  state.selected = null;
  render();
}

function flipFlashCard() {
  state.flashFlipped = !state.flashFlipped;
  render();
}

function toggleSaveFlashCard() {
  const cards = state.flashCards.length ? state.flashCards : localizedFlashCards();
  const card = cards[state.flashIndex] || cards[0];
  if (!card) return;
  if (state.flashSaved[card.id]) delete state.flashSaved[card.id];
  else state.flashSaved[card.id] = true;
  save("linux-saved-flashcards", state.flashSaved);
  render();
}

function moveFlashCard(delta) {
  const total = state.flashCards.length || localizedFlashCards().length;
  state.flashIndex = (state.flashIndex + delta + total) % total;
  state.flashFlipped = false;
  render();
}

function moveLab(delta) {
  state.labIndex = (state.labIndex + delta + commandLabBank.length) % commandLabBank.length;
  state.labRevealed = false;
  render();
}

function openFlashTopic() {
  const cards = state.flashCards.length ? state.flashCards : localizedFlashCards();
  const card = cards[state.flashIndex] || cards[0];
  if (!card) return;
  state.topicId = card.topic;
  state.screen = "topic";
  state.flashFlipped = false;
  render();
}

function addSwipe(node) {
  node.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  node.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 52) return;
    if (node.dataset.swipe === "lesson") moveLesson(dx < 0 ? 1 : -1);
    if (node.dataset.swipe === "quiz") moveQuestion(dx < 0 ? 1 : -1);
    if (node.dataset.swipe === "flashcards") moveFlashCard(dx < 0 ? 1 : -1);
  }, { passive: true });
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}

render();
